module Basscss
  module Rails
    if defined?(::Rails::Engine)
      class Engine < ::Rails::Engine
      end
    end
  end
end
