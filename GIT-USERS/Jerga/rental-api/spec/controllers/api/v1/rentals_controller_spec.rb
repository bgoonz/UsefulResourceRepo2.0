require "rails_helper"
include ActionDispatch::TestProcess::FixtureFile

RSpec.describe Api::V1::RentalsController, :type => :api do
  user = nil

  describe "No auth request" do
    it "it should not get rentals" do
      header "Authorization", ""
      get '/api/v1/rentals'
      expect(last_response.status).to eq 401
    end
  end

  describe "Auth requests" do
    before do
      user = User.create!(name: "Filip Jerga", email: "test@test.com", password: "testtest", password_confirmation: "testtest")
      token = JsonWebToken.encode({sub: user.id, email: user.email, name: user.name})
      header "Authorization", "Bearer #{token}"
    end

    it "it should get rentals" do
      get '/api/v1/rentals'
      expect(last_response.status).to eq 200
    end
    it "it should get rentals body" do
      file = fixture_file_upload(Rails.root.join("spec/assets/test.jpeg"))
      Rental.create!(
        title: "Grand old mansion",
        city: 'San Francisco',
        category: 'Estate',
        image: file,
        bedrooms: 15,
        description: 'Very nice mansiona kjanajkn dask nkasn kjasn kn kan kjn kn an ka nak k',
        daily_rate: 199,
        user: user)
      get '/api/v1/rentals'
      expect(json['data'].present?).to eq true
    end
  end
end
