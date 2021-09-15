require 'active_support/concern'

module Deckorator
  module Undecorator
    extend ActiveSupport::Concern

    def undecorate
      decorated_object
    end
  end
end
