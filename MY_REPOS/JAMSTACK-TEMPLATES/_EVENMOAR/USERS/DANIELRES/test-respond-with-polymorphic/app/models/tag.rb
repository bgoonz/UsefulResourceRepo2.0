class Tag < ActiveRecord::Base
  attr_accessible :name
  has_many :taggings
  has_many :projects,  :through => :taggings, :source => :taggable, :source_type => 'Project'
  has_many :tasks,     :through => :taggings, :source => :taggable, :source_type => 'Task'
  belongs_to :language
#   validates :name, :language_id, :presence => true

  def taggables
    projects + tasks
  end

  def to_s
    name
  end
end
