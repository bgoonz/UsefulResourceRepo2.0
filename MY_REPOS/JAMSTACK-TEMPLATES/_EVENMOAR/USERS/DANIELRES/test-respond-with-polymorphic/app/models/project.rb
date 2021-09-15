class Project < ActiveRecord::Base
  attr_accessible :name
  validates :name, :presence => true

  has_many :taggings, :as => :taggable
  has_many :tags, :through => :taggings

  has_many :comments, :as => :commentable

  has_many :tasks

  def to_s
    name
  end

end
