require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module TrelloClone
  class Application < Rails::Application
    config.load_defaults 5.1
    config.secret_key_base = ENV["SECRET_KEY_BASE"]
  end
end
