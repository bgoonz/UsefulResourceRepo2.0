require 'forem'
module Forem
  module Theme
    module Base
      class Engine < Rails::Engine
        Forem.theme = :base
      end
    end
  end
end
