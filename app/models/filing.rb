# == Schema Information
#
# Table name: filings
#
#  id                       :integer          not null, primary key
#  amended_return_indicator :text
#  filer_ein                :integer          not null
#  return_timestamp         :datetime         not null
#  tax_period               :date             not null
#
# Indexes
#
#  index_filings_on_filer  (filer_ein)
#

class Filing < ApplicationRecord
  validates :filer_ein, :return_timestamp, :tax_period, presence: true

  has_many :awards,
    class_name: :Award,
    foreign_key: :filing_id,
    primary_key: :id

  belongs_to :filer,
    class_name: :Filer,
    foreign_key: :filer_ein,
    primary_key: :ein
end
