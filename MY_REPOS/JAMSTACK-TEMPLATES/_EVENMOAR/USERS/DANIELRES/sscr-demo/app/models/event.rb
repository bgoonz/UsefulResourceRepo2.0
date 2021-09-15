class Event < ActiveRecord::Base
  attr_accessible :date, :name

  validates :name, :date, :presence => true
  validates :name, :uniqueness => true

  has_many :people, :through => :events_people

  def to_s
    name
  end

end
