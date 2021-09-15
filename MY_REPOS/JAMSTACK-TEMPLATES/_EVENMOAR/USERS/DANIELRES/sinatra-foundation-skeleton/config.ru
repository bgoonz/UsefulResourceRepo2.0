$LOAD_PATH.unshift File.expand_path(File.dirname(__FILE__))
require "rubygems"
require "bundler/setup"
require "sinatra/base"
require 'compass'
require "zurb-foundation"
require 'haml'

require "app"
run App
