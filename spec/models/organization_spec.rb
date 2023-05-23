require 'rails_helper'

RSpec.describe Organization, :type => :model do

  it "is not valid without a name" do
    org = Organization.new(name: nil)
    expect(org).to_not be_valid
  end

  it "is not valid without an ein" do
    org = Organization.new(ein: nil)
    expect(org).to_not be_valid
  end

  it "is not valid without an address" do
    org = Organization.new(address: nil)
    expect(org).to_not be_valid
  end

  it "is not valid without a zip" do
    org = Organization.new(zip: nil)
    expect(org).to_not be_valid
  end


end
