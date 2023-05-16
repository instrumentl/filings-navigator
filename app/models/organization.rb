class Organization < ApplicationRecord
	has_many :awards, class_name: "Award", foreign_key: "recipient_id"
	has_many :filings, class_name: "Award", foreign_key: "filer_id"
end
