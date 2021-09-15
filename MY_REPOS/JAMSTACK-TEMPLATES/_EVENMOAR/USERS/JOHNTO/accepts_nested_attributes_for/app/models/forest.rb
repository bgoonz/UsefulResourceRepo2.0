class Forest < ActiveRecord::Base
  has_many :trees
  
  accepts_nested_attributes_for :trees, allow_destroy: true

  validates_presence_of :name, :size, :climate, :latitude, :longitude
end
