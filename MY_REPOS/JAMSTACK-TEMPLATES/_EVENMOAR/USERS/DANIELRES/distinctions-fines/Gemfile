source 'http://rubygems.org'

gem 'rails', '3.1.0'

# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'

gem 'sqlite3'


# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails', "  ~> 3.1.0"
  gem 'coffee-rails', "~> 3.1.0"
  gem 'uglifier'
end

gem 'jquery-rails'

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

group :test do  
  # Pretty printed test output
  gem 'turn', :require => false
end

# VIEWS ___________________________

  gem "compass", "~> 0.12.alpha.0"
  
# EDITING _________________________
  gem 'bluecloth'  

# DEV _____________________________

  group :development, :test do
    gem 'haml-rails'  
    gem 'guard'
    gem 'guard-compass'
    gem 'guard-livereload'    
  end

# FIX _____________________________

  gem 'execjs'
  gem 'therubyracer'
  
# AUTH ————————————————————————————

  gem 'devise'
  gem 'cancan'
  gem 'omniauth', '>= 0.3.0.rc3'
  
  
# ADMIN ___________________________

  gem 'rails_admin', :git => 'git://github.com/sferik/rails_admin.git'

# COMMENTS _________________________

  gem 'acts_as_commentable'
    
