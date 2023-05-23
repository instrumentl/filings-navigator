class Award < ApplicationRecord
	belongs_to :filing
	belongs_to :recipient, class_name: "Organization"

	validates_presence_of :purpose
	validates_presence_of :amount
	validates_presence_of :tax_period
end
