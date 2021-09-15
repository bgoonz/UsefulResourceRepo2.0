require 'bundler'
Bundler.require

DataMapper.setup :default, "abstract::"

class DummyModel < Object
  include DataMapper::Resource
end