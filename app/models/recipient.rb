# == Schema Information
#
# Table name: recipients
#
#  id         :integer          not null, primary key
#  city       :text             not null
#  ein        :integer          not null
#  line_1     :text             not null
#  name       :text             not null
#  state      :text             not null
#  zipcode    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rexml/document'

class Recipient < ApplicationRecord
  validates :ein, :line_1, :city, :name, :state, :zipcode, presence: true

  has_many :awards,
    class_name: :Award,
    foreign_key: :recipient_ein,
    primary_key: :ein

  has_many :filers,
    class_name: :Filer,
    through: :awards
end
