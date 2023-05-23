require 'rails_helper'

RSpec.describe Filing, :type => :model do

  it "is not valid without a filer_id" do
    org = Filing.new(filer_id: nil)
    expect(org).to_not be_valid
  end

  it "is not valid without a return_timestamp" do
    org = Filing.new(return_timestamp: nil)
    expect(org).to_not be_valid
  end

end
