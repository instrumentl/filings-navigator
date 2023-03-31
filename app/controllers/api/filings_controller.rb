require 'net/http'
require 'base64'

class Api::FilingsController < ApplicationController
  protect_from_forgery with: :null_session

  # GET /api/filings or /api/filings.json
  def index
    begin
      @filings = get_filings_from_params().paginate(:page => params[:page], :per_page => 10)
      render 'api/filings/index'
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  # GET /api/filings/1 or /api/filings/1.json
  def show
    begin
      @filing = Filing.find(params[:id])
      render 'api/filings/show'
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  # POST /api/filings
  def create
    filing_params = params.require(:filing).permit(:xml_data, :url)

    begin
      # Read xml data from file or url      
      data = filing_params[:url] ? 
        Net::HTTP.get(URI(filing_params[:url])) : 
        Base64.decode64(filing_params[:xml_data])

      xml_hash = Hash.from_xml(data)['Return']
      header = xml_hash['ReturnHeader']
      award_list = xml_hash['ReturnData']&.[]('IRS990ScheduleI')&.[]('RecipientTable') || []

      # Keep track of keys as connected objects are created
      # All foreign keys for other objects with one exception, return_ind
      # With it's position in the return, it simplifies all logic to place it here instead
      # I don't like it, and would change how I break down the hash for production code
      keys = {
        'return_ind' => xml_hash['ReturnData']&.[]('IRS990')&.[]('AmendedReturnInd') || "N/A"
      }
  
      # Create or find the filer instance
      filer = find_or_create_instance(data: header['Filer'], instanceType: "filer")
      keys['filer_ein'] = filer.ein
  
      # Create filing instance
      @filing = find_or_create_instance(data: header, instanceType: "filing", key_hash: keys)
      keys['filing_id'] = @filing.id
  
      # Iterate through awards
      award_list.each do |award|
  
        # If the recipient has no EIN, I'm going to ignore it for this demo
        # In production, I would prompt the user for a correction or throw an exception
        keys['recipient_ein'] = award['RecipientEIN'] || award['EINOfRecipient']
        if !keys['recipient_ein'].nil?

          # Create or find the recipient instance for the current award
          recipient = find_or_create_instance(data: award, instanceType: "recipient")
    
          # Create award instance
          award = find_or_create_instance(
            data: award, 
            instanceType: "award", 
            key_hash: keys
          )

        end

      end

      render 'api/filings/show'

    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  private
  
  def find_or_create_instance(data:, instanceType:, key_hash: nil)
    case instanceType
    when "recipient", "filer"
      isRecipient = instanceType == "recipient"
      return find_or_create_by_ein(data: data, isRecipient: isRecipient)
    when "filing", "award"
      isFiling = instanceType == "filing"
      return find_or_create_by_all_details(
        data: data, 
        key_hash: key_hash, 
        isFiling: isFiling
      )
    else
      return nil
    end
  end

  def find_or_create_by_all_details(data:, key_hash:, isFiling:)
    if isFiling

      filing_obj = build_filer_obj(data: data, key_hash: key_hash)
      existing_filing = Filing.find_by(**filing_obj)

      if !existing_filing
        filing = Filing.new(filing_obj)
        filing.save!
      else
        filing = existing_filing
      end

      return filing

    else

      award_obj = build_award_obj(data: data, key_hash: key_hash)
      existing_award = Award.find_by(**award_obj)

      if !existing_award
        award = Award.new(award_obj)
        award.save!
      else
        award = existing_award
      end

      return award

    end
  end

  def find_or_create_by_ein(data:, isRecipient:)
    business_obj = build_business_obj(data: data, isRecipient: isRecipient)

    if isRecipient
      data_recipient_ein = data['RecipientEIN'] || data['EINOfRecipient']
      existing_business = Recipient.find_by(ein: data_recipient_ein)
    else
      existing_business = Filer.find_by(ein: data['EIN'])
    end

    if existing_business.nil?
      new_business = isRecipient ?
        Recipient.new(business_obj) :
        Filer.new(business_obj)
      new_business.save!
      return new_business
    else
      return existing_business
    end
  end

  def build_business_obj(data:, isRecipient:)
    potential_keys = isRecipient ? 
      ['RecipientNameBusiness', 'RecipientBusinessName'] : 
      ['Name', 'BusinessName']
    
    b_name = data[potential_keys[0]] || data[potential_keys[1]]
    address_data = data['USAddress'] || data['AddressUS']
    data_ein = isRecipient ? 
      data['RecipientEIN'] || data['EINOfRecipient'] : 
      data['EIN']

    return {
      ein: data_ein,
      name: b_name['BusinessNameLine1'] || b_name['BusinessNameLine1Txt'],
      line_1: address_data['AddressLine1'] || address_data['AddressLine1Txt'],
      city: address_data['City'] || address_data['CityNm'],
      state: address_data['State'] || address_data['StateAbbreviationCd'],
      zipcode: address_data['ZIPCode'] || address_data['ZIPCd']
    }
  end

  def build_award_obj(data:, key_hash:)
    return {
      filing_id: key_hash['filing_id'],
      filer_ein: key_hash['filer_ein'],
      award_amount: data['AmountOfCashGrant'] || data['CashGrantAmt'],
      recipient_ein: key_hash['recipient_ein'],
      purpose: data['PurposeOfGrantTxt'] || data['GrantOrContributionPurposeTxt']
    }
  end

  def build_filer_obj(data:, key_hash:)
    return {
      return_timestamp: data['ReturnTs'],
      amended_return_indicator: key_hash['return_ind'],
      tax_period: data['TaxPeriodEndDt'] || data['TaxPeriodEndDate'],
      filer_ein: key_hash['filer_ein']
    }
  end

  def get_filings_from_params
    @filings = Filing.all

    if params[:filer_ein].present?
      @filings = @filings.where(filer_ein: params[:filer_ein])
    end

    if params[:filer_name].present?
      @filings = @filings.joins(:filer).where(filers: { name: params[:filer_name] })
    end

    if params[:more_awards_than].present?
      @filings = @filings.joins(:awards)
        .group('filings.id')
        .having('count(DISTINCT awards.id) > ?', params[:more_awards_than].to_i)
    end

    if params[:less_awards_than].present?
      @filings = @filings.joins(:awards)
        .group('filings.id')
        .having('count(DISTINCT awards.id) < ?', params[:less_awards_than].to_i)
    end

    if params[:awarded_more_than].present?
      @filings = @filings.joins(:awards)
        .group('filings.id')
        .having('sum(awards.award_amount) > ?', params[:awarded_more_than].to_i)
    end

    if params[:awarded_less_than].present?
      @filings = @filings.joins(:awards)
        .group('filings.id')
        .having('sum(awards.award_amount) < ?', params[:awarded_less_than].to_i)
    end

    return @filings
  end
end
