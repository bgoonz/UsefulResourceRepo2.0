source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.4'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.21.0'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'friendly_id', '~> 5.1.0'
gem 'devise', '~> 4.2'
gem 'bootstrap', '~> 4.0.0.alpha6'
gem 'jquery-rails', '~> 4.3'
gem 'popper_js', '~> 1.11', '>= 1.11.1'
gem 'jerga_view_tool', git: 'https://github.com/Jerga99/jerga_view_tool'
gem 'petergate', '~> 1.7'
gem 'font-awesome-rails', '~> 4.7', '>= 4.7.0.1'
gem 'kaminari', '~> 1.1', '>= 1.1.1'
gem 'jquery-ui-rails', '~> 6.0', '>= 6.0.1'
gem 'carrierwave', '~> 1.2', '>= 1.2.2'
gem 'mini_magick', '~> 4.8'
gem 'carrierwave-aws', '~> 1.3'
gem 'dotenv-rails', '~> 2.2', '>= 2.2.1'
gem 'fog'
gem 'cocoon', '~> 1.2', '>= 1.2.11'
gem 'gritter', '~> 1.2'
gem 'twitter', '~> 6.2'
gem "redis", "~> 3.3.3"
gem 'redcarpet', '~> 3.4'
gem 'coderay', '~> 1.1', '>= 1.1.2'
gem 'pdfjs_viewer-rails'

ruby "2.4.1"
