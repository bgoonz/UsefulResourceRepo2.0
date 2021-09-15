$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)
require 'deckorator'
require 'active_support'
require 'active_support/core_ext'
require 'active_model/naming'

RSpec.configure do |c|
  c.filter_run focus: true
  c.run_all_when_everything_filtered = true
end

class ApplicationDecorator
  include Deckorator::Delegator
  include Deckorator::Undecorator

  attr_accessor :decorated_object
  cattr_accessor :decorated_object_class

  def initialize(object)
    @decorated_object = object
    self.class.decorated_object_class = object.class
  end
end

class FakeModel
  def name
    'Fred Flinstone'
  end

  def self.model_name
    'Fake'
  end

  def to_param
    name
  end
end

class FakeModelDecorator < ApplicationDecorator
  def yelling_name
    "#{name.upcase}!!!"
  end
end

class FakeController
  include Deckorator

  def show
    @fake_model = FakeModel.new
    @fake_model = decorate(@fake_model)
  end
end

class Post < Struct.new(:text); end
class PostDecorator < ApplicationDecorator
  def display_text; "Bang! #{post.text}"; end

  def comments
    Deckorator.decorate([Comment.new, Comment.new])
  end
end

class Comment < Struct.new(:text)
  def self.decorator_class
    CommentDecorator
  end
end
class CommentDecorator < Struct.new(:comment); end

class User < Struct.new(:username)
  def decorator_class
    AwesomeUserDecorator
  end
end
class AwesomeUserDecorator < Struct.new(:user); end

class Blog < Struct.new(:title)
  extend ActiveModel::Naming
  def self.to_s
    nil
  end
end
class BlogDecorator < Struct.new(:blog); end
