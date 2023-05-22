class FilingsSerializer < ActiveModel::Serializer
	attributes :id, :amended_return, :return_timestamp

	def amended_return
		object.amended_return.to_s
	end

	def return_timestamp
		object.return_timestamp.strftime("%B %d %Y, %I:%M:%S %p")
	end

end