class Task < ActiveRecord::Base
  attr_accessible :body, :project_id, :title
  validates :title, :project_id, :presence => true

  has_many :comments, :as => :commentable

  belongs_to :project

  def to_s
    title
  end

end
