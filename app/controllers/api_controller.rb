# In a real world app this would be split across multiple api controllers probably using resources
# Just using methods for the specific requirements in this case.

class ApiController < ApplicationController

  def filers
    # In a Production application we wouldn't use `.all` since this isn't a scalable solution. We might even mark organizations as filers or not so that we can do a
    # quick grab of filers rather than relying on associations etc..
    filers = Filing.preload(:filer).all.map(&:filer).uniq
    render json: { filers: ActiveModelSerializers::SerializableResource.new(filers, each_serializer: ::FilingsFilerSerializer) }
  end

  def filings
    filings = Filing.where('filer_id = ?', params[:id])
    render json: { filings: ActiveModelSerializers::SerializableResource.new(filings, each_serializer: ::FilingsSerializer) }
  end

  def awards
    awards = Award.where('filing_id = ?', params[:id])
    render json: { awards: ActiveModelSerializers::SerializableResource.new(awards, each_serializer: ::AwardsSerializer) }
  end

  def recipients
    recipients = Award.preload(:recipient).all.map(&:recipient).uniq
    render json: { recipients: ActiveModelSerializers::SerializableResource.new(recipients, each_serializer: ::RecipientsSerializer) }
  end

end
