ENV["RAILS_ENV"] = "test"
require File.expand_path("../../config/environment", __FILE__)
require "rails/test_help"
require "minitest/rails"
require "mocha/mini_test"


require "minitest/reporters"
Minitest::Reporters.use! Minitest::Reporters::SpecReporter2.new(color: true), ENV, Minitest.backtrace_filter

# To add Capybara feature tests add `gem "minitest-rails-capybara"`
# to the test group in the Gemfile and uncomment the following:
# require "minitest/rails/capybara"

# Uncomment for awesome colorful output
# require "minitest/pride"

DatabaseCleaner.strategy = :transaction
DatabaseCleaner.clean_with(:truncation)

class Minitest::Rails::Spec
  def setup
    DatabaseCleaner.start
  end

  def teardown
    DatabaseCleaner.clean
  end
end

class ActiveSupport::TestCase
    ActiveRecord::Migration.check_pending!

    # Setup all fixtures in test/fixtures/*.(yml|csv) for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  fixtures :all
  include Rack::Test::Methods

  # Add more helper methods to be used by all tests here...
  def token_auth_with_user(user)
    header "Authorization", user.access_token
  end

  @@test_user = User.create(
    email:"testuser@test.com",
    username: "Testuser",
    password: "123456789",
  )

end

class APITest; end
