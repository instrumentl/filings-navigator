require 'rails_helper'

RSpec.describe Award, :type => :model do
  it "is not valid without a purpose" do
    org = Award.new(purpose: nil)
    expect(org).to_not be_valid
  end

  it "is not valid without an amount" do
    org = Award.new(amount: nil)
    expect(org).to_not be_valid
  end

  it "is not valid without a tax_period" do
    org = Award.new(tax_period: nil)
    expect(org).to_not be_valid
  end
end
