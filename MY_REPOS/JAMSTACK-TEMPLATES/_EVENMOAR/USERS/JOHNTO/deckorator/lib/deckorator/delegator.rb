require 'active_support/concern'

module Deckorator
  module Delegator
    extend ActiveSupport::Concern

    def method_missing(method, *args, &block)
      decorated_object.respond_to?(method) ?
        decorated_object.send(method, *args, &block) :
        super
    end

    def to_param
      decorated_object.respond_to?(:to_param) ?
        decorated_object.to_param : super
    end

    module ClassMethods
      def method_missing(method, *args, &block)
        decorated_object_class.respond_to?(method) ?
          decorated_object_class.send(method, *args, &block) :
          super
      end
    end
  end
end
