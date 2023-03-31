class Api::AwardsController < ApplicationController
  # GET /api/awards or /api/awards.json
  def index
    begin
      @awards = get_awards_from_params().paginate(:page => params[:page], :per_page => 10)
      render 'api/awards/index'
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  # GET /api/awards/1 or /api/awards/1.json
  def show
    begin
      @award = Award.find(params[:id])
      render 'api/awards/show'
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  private

  def get_awards_from_params
    @awards = Award.all

    if params[:filing_id].present?
      @awards = @awards.where(filing_id: params[:filing_id])
    end

    if params[:filer_ein].present?
      @awards = @awards.where(filer_ein: params[:filer_ein])
    end

    if params[:filer_name].present?
      @awards = @awards.joins(:filer).where(filers: { name: params[:filer_name] })
    end

    if params[:recipient_ein].present?
      @awards = @awards.where(recipient_ein: params[:recipient_ein])
    end

    if params[:recipient_name].present?
      @awards = @awards.joins(:recipient).where(recipients: { name: params[:recipient_name] })
    end

    if params[:amount_more_than].present?
      @awards = @awards.where("award_amount > ?", params[:amount_more_than])
    end

    if params[:amount_less_than].present?
      @awards = @awards.where("award_amount < ?", params[:amount_less_than])
    end

    return @awards
  end
end
