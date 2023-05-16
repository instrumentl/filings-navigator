class Filing < ApplicationRecord
	belongs_to :filer, class_name: "Organization"
	has_many :awards
end
