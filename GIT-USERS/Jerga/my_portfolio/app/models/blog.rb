class Blog < ApplicationRecord
  enum status: {
    draft: 0,
    published: 1
  }

  validates_presence_of :title, :body, :topic_id
  belongs_to :topic
  has_many :comments, dependent: :destroy
  mount_uploader :main_image, BlogUploader

  extend FriendlyId
  friendly_id :title, use: :slugged

  def self.recent
    order("created_at DESC")
  end
end
