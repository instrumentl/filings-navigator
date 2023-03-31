class Api::FilersController < ApplicationController
  # GET /api/filers or /api/filers.json
  def index
    begin
      @filers = get_filers_from_params().paginate(:page => params[:page], :per_page => 10)
      render 'api/filers/index'
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  # GET /api/filers/1 or /api/filers/1.json
  def show
    begin
      @filer = Filer.find(params[:id])
      render 'api/filers/show'
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  private

  def get_filers_from_params
    @filers = Filer.all

    if params[:ein].present?
      @filers = @filers.where(:ein => params[:ein])
    end

    if params[:name].present?
      @filers = @filers.where(:name => params[:name])
    end

    if params[:city].present?
      @filers = @filers.where(:city => params[:city])
    end

    if params[:state].present?
      @filers = @filers.where(:state => params[:state])
    end

    if params[:more_filings_than].present?
      @filers = @filers.joins(:filings)
        .group('filers.id')
        .having('count(DISTINCT filings.id) > ?', params[:more_filings_than].to_i)
    end

    if params[:less_filings_than].present?
      @filers = @filers.joins(:filings)
        .group('filers.id')
        .having('count(DISTINCT filings.id) < ?', params[:less_filings_than].to_i)
    end

    if params[:more_awards_than].present?
      @filers = @filers.joins(:awards)
        .group('filers.id')
        .having('count(DISTINCT awards.id) > ?', params[:more_awards_than].to_i)
    end

    if params[:less_awards_than].present?
      @filers = @filers.joins(:awards)
        .group('filers.id')
        .having('count(DISTINCT awards.id) < ?', params[:less_awards_than].to_i)
    end

    if params[:awarded_more_than].present?
      @filers = @filers.joins(:awards)
        .group('filers.id')
        .having('sum(awards.award_amount) > ?', params[:awarded_more_than].to_i)
    end

    if params[:awarded_less_than].present?
      @filers = @filers.joins(:awards)
        .group('filers.id')
        .having('sum(awards.award_amount) < ?', params[:awarded_less_than].to_i)
    end

    return @filers
  end
end
