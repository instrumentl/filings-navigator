class RecipientsSerializer < ActiveModel::Serializer
	attributes :id, :ein, :address, :city, :state, :zip, :name
end