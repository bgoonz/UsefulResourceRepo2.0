class Discussion < ActiveRecord::Base
  belongs_to :discutable, polymorphic: true
  has_many :discussion_entries

  validates :title, presence: true
  validates :title, length: { minimum: 3 }
  validates :author_id, presence: true

  belongs_to :author, class_name: "User", foreign_key: "author_id"

end
