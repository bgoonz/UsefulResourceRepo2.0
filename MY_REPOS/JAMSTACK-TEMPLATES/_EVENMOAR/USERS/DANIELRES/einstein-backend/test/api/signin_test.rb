require "test_helper"
include Warden::Test::Helpers

class APITest::AuthenticationTest < ActiveSupport::TestCase

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

    describe "with valid username and password" do
      let(:credentials) do
        { username: "testuser@test.com", password: "123456789" }
      end
      it "returns an HTTP status 200 with the representation of the authenticated user and its access token" do
        post '/login/',  credentials
        last_response.must_be :ok?
        JSON.parse(last_response.body)['id'].must_be :present?
        JSON.parse(last_response.body)['email'].must_equal "testuser@test.com"
        JSON.parse(last_response.body)['access_token'].must_equal User.last.access_token
        JSON.parse(last_response.body)['username'].must_equal 'Testuser'
        JSON.parse(last_response.body)['created_at'].must_be :present?
        JSON.parse(last_response.body)['updated_at'].must_be :present?
      end
    end
  end

end
