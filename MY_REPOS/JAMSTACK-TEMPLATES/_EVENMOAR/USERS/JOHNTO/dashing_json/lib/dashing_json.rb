require 'dashing_json/version'
require 'dashing_json/engine'
require 'dashing_json/view_helpers'

module DashingJson
  include ViewHelpers
end

defined?(Rails::Railtie) ?
  require('dashing_json/railtie') :
  raise('dashing_json requires Rails::Railtie')