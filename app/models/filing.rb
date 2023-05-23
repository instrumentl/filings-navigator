class Filing < ApplicationRecord
	belongs_to :filer, class_name: "Organization"
	has_many :awards

	validates_presence_of :filer_id
	validates_presence_of :return_timestamp
end
