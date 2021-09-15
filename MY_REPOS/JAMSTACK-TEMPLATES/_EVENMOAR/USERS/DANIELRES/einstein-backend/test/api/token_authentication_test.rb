require "test_helper"
include Warden::Test::Helpers

class APITest::TokenAuthenticationTest < ActiveSupport::TestCase

  def app
    Rails.application
  end

  describe "POST /login" do
    before do
      User.create(
        email:"testuser@test.com",
        username: "Testuser",
        password: "123456789",
      )
    end

    describe "access token authentication" do
      let(:access_token) do
        User.last.access_token
      end
      it "returns an HTTP status 200 with the representation of the authenticated user and its access token" do
        header "Authorization", access_token
        post '/login/'
        JSON.parse(last_response.body)['id'].must_be :present?
        JSON.parse(last_response.body)['email'].must_equal "testuser@test.com"
        JSON.parse(last_response.body)['username'].must_equal 'Testuser'
        JSON.parse(last_response.body)['access_token'].must_equal access_token
      end
    end
  end

end


