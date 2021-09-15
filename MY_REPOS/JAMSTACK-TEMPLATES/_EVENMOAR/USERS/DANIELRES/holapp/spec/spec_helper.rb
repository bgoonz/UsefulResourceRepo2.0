# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'email_spec'
# require 'rspec/autorun'
require 'capybara/poltergeist'
require 'selenium/webdriver'

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

require 'simplecov'
SimpleCov.start 'rails'

RSpec.configure do |config|
  config.treat_symbols_as_metadata_keys_with_true_values = true

  config.include(EmailSpec::Helpers)
  config.include(EmailSpec::Matchers)
  # ## Mock Framework
  #
  # If you prefer to use mocha, flexmock or RR, uncomment the appropriate line:
  #
  # config.mock_with :mocha
  # config.mock_with :flexmock
  # config.mock_with :rr

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # If true, the base class of anonymous controllers will be inferred
  # automatically. This will be the default behavior in future versions of
  # rspec-rails.
  config.infer_base_class_for_anonymous_controllers = false

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = "random"

end



Selenium::WebDriver::Firefox::Binary.path='/opt/firefox35/firefox-bin'

RSpec.configure do |config|
  Capybara.javascript_driver = :poltergeist
  Capybara.default_driver    = :poltergeist
  Capybara.register_driver :poltergeist do |app|
      options = {
          :js_errors => true,
          :timeout => 120,
          :debug => false,
          :phantomjs_options => ['--load-images=no', '--disk-cache=false'],
          :inspector => true,
      }
      Capybara::Poltergeist::Driver.new(app, options)
  end
end


# transactions are well supported with rack_test only
# so we switch to truncation in other cases, see:
# http://stackoverflow.com/questions/8178120/capybara-with-js-true-causes-test-to-fail/8698940#8698940
RSpec.configure do |config|
  config.use_transactional_fixtures = false

  config.before :each do
    if Capybara.current_driver == :rack_test
      DatabaseCleaner.strategy = :transaction
    else
      DatabaseCleaner.strategy = :truncation
    end
    DatabaseCleaner.start
  end

  config.after do
    DatabaseCleaner.clean
  end
end


# support for short syntax expect_it
RSpec.configure do |c|
  c.alias_example_to :expect_it
end
RSpec::Core::MemoizedHelpers.module_eval do
  alias to should
  alias to_not should_not
end


I18n.enforce_available_locales = false


