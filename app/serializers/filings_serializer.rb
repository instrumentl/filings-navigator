class FilingsSerializer < ActiveModel::Serializer
	attributes :id, :amended_return, :return_timestamp, :total_value

	def amended_return
		object.amended_return.to_s
	end

	def return_timestamp
		object.return_timestamp.strftime("%B %d %Y, %I:%M:%S %p")
	end

	def total_value
		(object.awards.sum(:amount)/100).to_s
	end

end