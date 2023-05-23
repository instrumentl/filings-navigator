class Organization < ApplicationRecord
	has_many :awards, class_name: "Award", foreign_key: "recipient_id"
	has_many :filings, class_name: "Award", foreign_key: "filer_id"

	validates_presence_of :ein
	validates_presence_of :address
	validates_presence_of :name
	validates_presence_of :zip
end
