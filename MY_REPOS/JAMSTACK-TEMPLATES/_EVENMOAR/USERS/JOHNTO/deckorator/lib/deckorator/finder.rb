require 'active_support/core_ext/string/inflections'

module Deckorator
  class Finder
    SUFFIX = 'Decorator'

    def self.find(record)
      if record.nil?
        nil
      elsif record.class.respond_to?(:decorator_class)
        record.class.decorator_class
      elsif record.respond_to?(:decorator_class)
        record.decorator_class
      else
        klass = if record.class.respond_to?(:model_name)
          record.class.model_name
        elsif record.respond_to?(:model_name)
          record.model_name
        else
          record.class
        end
        "#{klass}#{SUFFIX}".constantize
      end
    end
  end
end
