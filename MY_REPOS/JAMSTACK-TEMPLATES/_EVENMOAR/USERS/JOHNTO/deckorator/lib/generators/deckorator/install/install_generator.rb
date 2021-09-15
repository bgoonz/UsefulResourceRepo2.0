module Deckorator
  module Generators
    class InstallGenerator < ::Rails::Generators::Base
      source_root File.expand_path(File.join(File.dirname(__FILE__), 'templates'))

      def copy_application_decorator
        template 'application_decorator.rb', 'app/decorators/application_decorator.rb'

      end
    end
  end
end
