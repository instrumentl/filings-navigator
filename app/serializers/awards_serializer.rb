class AwardsSerializer < ActiveModel::Serializer
	attributes :id, :purpose, :recipient_id, :amount
end