class Tagging < ActiveRecord::Base
  attr_accessible :tag_id, :taggable_id, :taggable_type
  belongs_to :tag
  belongs_to :taggable, :polymorphic => true
  validates  :taggable_id, :taggable_type, :tag_id, :presence => true
  validates :taggable_id, :uniqueness => { :scope => :tag_id, :message => "This taggging already exists" }
end
