require 'dashing_json'

module DashingJson
  class Railtie < Rails::Railtie
    initializer 'dashing_json' do |app|
      ActionView::Base.send :include, DashingJson
    end
  end
end