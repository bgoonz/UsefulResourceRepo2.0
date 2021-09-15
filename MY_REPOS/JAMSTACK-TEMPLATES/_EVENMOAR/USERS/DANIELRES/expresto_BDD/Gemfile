require 'rbconfig'
HOST_OS = RbConfig::CONFIG['host_os']
source 'https://rubygems.org'
gem 'rails', '3.2.2'

group :assets do
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'
gem "haml", ">= 3.1.4"
gem "haml-rails", ">= 0.3.4"
gem "devise", ">= 2.1.0.rc"
gem 'cancan'
gem "inherited_resources"
gem "simple_form"
gem "email_spec", ">= 1.2.1", group: :test
gem "sass-rails", "= 3.2.5"
gem 'compass_twitter_bootstrap', "2.0.3"
gem "compass-rails", "1.0.3" #, "~> 1.0.0"#, group: [:assets]

group :development do
  gem 'sqlite3'
  gem 'libnotify'
  gem 'rb-inotify'
  gem 'guard'
  gem 'guard-cucumber'
  # gem "guard-bundler", ">= 0.1.3"
  # gem "guard-rails", ">= 0.0.3"
  # gem "guard-livereload", ">= 0.3.0"
  # gem "guard-spork"
  # gem "guard-rspec", ">= 0.4.3"
end

group :development, :test do
  gem "mocha", require: false
  gem 'launchy', '>= 2.1.0'
  gem "database_cleaner"
  gem "rspec-rails", ">= 2.9.0.rc2"
  gem "factory_girl_rails", "~> 3.0"
  gem "capybara"
  gem "cucumber-rails", require: false
  gem 'zeus'

end


group :production do
  gem 'newrelic_rpm'
  gem 'pg'
end

gem "thin"
gem 'kaminari'
gem 'gravatar_image_tag'
gem "friendly_id", "~> 4.0.1"
gem 'acts_as_commentable_with_threading'
gem 'rest_in_place'

gem 'simplecov', require: false, group: :test