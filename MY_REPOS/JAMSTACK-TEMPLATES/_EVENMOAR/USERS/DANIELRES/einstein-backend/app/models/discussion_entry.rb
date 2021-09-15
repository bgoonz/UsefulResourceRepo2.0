class DiscussionEntry < ActiveRecord::Base

  belongs_to :discussion
  belongs_to :author, class_name: "User", foreign_key: "author_id"

  validates :body, presence: true
  validates :body, length: { minimum: 1 }
  validates :author_id, presence: true
  validates :discussion_id, presence: true

end
