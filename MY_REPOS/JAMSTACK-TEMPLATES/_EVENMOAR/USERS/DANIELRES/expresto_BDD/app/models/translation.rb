class Translation < ActiveRecord::Base
  validates :body_semantic, :body_litteral, :expression_id, :author_id, :language_id, :presence => true
  belongs_to :expression
  belongs_to :author, :class_name => 'User'
  belongs_to :language
end
