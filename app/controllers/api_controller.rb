# In a real world app this would be split across multiple api controllers probably using resources
# Just using methods for the specific requirements in this case.

class ApiController < ApplicationController

  def filers
    # In a Production application we wouldn't use `.all` since this isn't a scalable solution. We might even mark organizations as filers or not so that we can do a
    # quick grab of filers rather than relying on associations etc..
    filers = Filing.preload(:filer).all.map(&:filer).uniq
    render json: { filers: filers }
  end

  def filings
    filings = Filing.where('filer_id = ?', params[:id])
    render json: { filings: filings }
  end

  def awards
    awards = Award.where('filing_id = ?', params[:id])
    render json: { awards: awards }
  end

  def recipients
    recipients = Award.preload(:recipient).all.map(&:recipient).uniq
    render json: { recipients: recipients }
  end

end
