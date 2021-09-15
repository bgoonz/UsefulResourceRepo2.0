source 'https://rubygems.org'


gem 'rails', '4.2.1'

gem 'rails-api'

gem 'rack-cors', require: 'rack/cors'


gem 'spring', group: :development


group :development, :test do
  gem 'sqlite3'
  gem 'pry'
end

group :production do
  gem 'pg'
end

gem 'devise'

gem 'thin'

gem 'active_model_serializers'

gem 'grape'
gem 'hashie-forbidden_attributes'

group :test do
  gem 'minitest-rails'
  gem 'minitest-rails-capybara'
  gem 'minitest-focus'
  gem 'minitest-reporters'
  gem 'database_cleaner'
  gem 'mocha'
  gem 'shoulda'
end

group :development do
  gem 'guard' # NOTE: this is necessary in newer versions
  gem 'guard-minitest'
end

# To use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano', group: :development

# To use debugger
# gem 'ruby-debug19', require: 'ruby-debug'
