module Deckorator
  module Generators
    class DecoratorGenerator < ::Rails::Generators::NamedBase
      source_root File.expand_path(File.join(File.dirname(__FILE__), 'templates'))

      def create_decorator
        template 'decorator.rb', File.join('app/decorators', class_path, "#{file_name}_decorator.rb")
      end
    end
  end
end
