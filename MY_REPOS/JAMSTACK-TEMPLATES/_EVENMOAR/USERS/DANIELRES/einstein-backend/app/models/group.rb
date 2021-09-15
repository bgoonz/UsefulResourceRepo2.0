class Group < ActiveRecord::Base
  has_many :discussions, as: :discutable, dependent: :destroy

  validates :name, presence: true
  validates :name, length: { minimum: 3 }

  validates :description, presence: true
  validates :description, length: { minimum: 3 }
end
