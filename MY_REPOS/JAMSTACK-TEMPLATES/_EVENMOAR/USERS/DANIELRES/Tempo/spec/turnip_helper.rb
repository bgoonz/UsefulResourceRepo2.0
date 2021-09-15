require_relative '../app'

require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec'
Dir.glob("spec/acceptance/steps/*steps.rb") { |f| load f, true }


Capybara.app = Tempo



def extract_words_from comma_separated_words
  comma_separated_words.split(',').map(&:strip)
end

def the purpose_name
  "[data-purpose=#{purpose_name}]"
end

def have_the *args, &block
  args[0] = the args[0]
  have_css *args, &block
end