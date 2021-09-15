class Comment < ActiveRecord::Base
  attr_accessible :body, :commentable_type, :commentable_id
  belongs_to :commentable, :polymorphic => true

  belongs_to :author, :class_name => 'User'

  validates :author_id, :presence => true



end
