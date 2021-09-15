class Person < ActiveRecord::Base
  attr_accessible :first_name, :last_name

  validates :first_name, :last_name, :presence => true
  validates :first_name, :uniqueness => { :scope => :last_name }

  has_many :events, :through => :events_people

end
