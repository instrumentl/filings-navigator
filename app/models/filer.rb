# == Schema Information
#
# Table name: filers
#
#  id      :integer          not null, primary key
#  city    :text             not null
#  ein     :integer          not null
#  line_1  :text             not null
#  name    :text             not null
#  state   :text             not null
#  zipcode :integer          not null
#

class Filer < ApplicationRecord
  validates :ein, :line_1, :city, :name, :state, :zipcode, presence: true

  has_many :awards,
    class_name: :Award,
    foreign_key: :filer_ein,
    primary_key: :ein

  has_many :filings,
    class_name: :Filing,
    foreign_key: :filer_ein,
    primary_key: :ein
end
