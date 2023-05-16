class Award < ApplicationRecord
	belongs_to :filing
	belongs_to :recipient, class_name: "Organization"
end
