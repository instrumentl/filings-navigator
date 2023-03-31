class Api::RecipientsController < ApplicationController
  # GET /api/recipients or /api/recipients.json
  def index
    begin
      @recipients = get_recipients_from_params().paginate(:page => params[:page], :per_page => 10)
      render 'api/recipients/index'
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  # GET /api/recipients/1 or /api/recipients/1.json
  def show
    begin
      @recipient = Recipient.find(params[:id])
      render 'api/recipients/show'
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  private

  def get_recipients_from_params
    @recipients = Recipient.all

    if params[:ein].present?
      @recipients = @recipients.where(:ein => params[:ein])
    end

    if params[:name].present?
      @recipients = @recipients.where(:name => params[:name])
    end

    if params[:city].present?
      @recipients = @recipients.where(:city => params[:city])
    end

    if params[:state].present?
      @recipients = @recipients.where(:state => params[:state])
    end

    if params[:more_awards_than].present?
      @recipients = @recipients.joins(:awards)
        .group('recipients.id')
        .having('count(DISTINCT awards.id) > ?', params[:more_awards_than].to_i)
    end

    if params[:less_awards_than].present?
      @recipients = @recipients.joins(:awards)
        .group('recipients.id')
        .having('count(DISTINCT awards.id) < ?', params[:less_awards_than].to_i)
    end

    if params[:awarded_more_than].present?
      @recipients = @recipients.joins(:awards)
        .group('recipients.id')
        .having('sum(awards.award_amount) > ?', params[:awarded_more_than].to_i)
    end

    if params[:awarded_less_than].present?
      @recipients = @recipients.joins(:awards)
        .group('recipients.id')
        .having('sum(awards.award_amount) < ?', params[:awarded_less_than].to_i)
    end

    if params[:awarded_by_name].present?
      @recipients = @recipients.joins(:filers)
        .where(:name => params[:awarded_by_name])
    end

    if params[:awarded_by_ein].present?
      @recipients = @recipients.joins(:filers)
        .where(:ein => params[:awarded_by_ein])
    end

    return @recipients
  end
end
