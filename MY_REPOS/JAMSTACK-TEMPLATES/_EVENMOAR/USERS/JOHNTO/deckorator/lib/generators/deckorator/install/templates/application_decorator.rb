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
