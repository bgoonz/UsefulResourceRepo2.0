class Booking < ApplicationRecord
  validates_presence_of :start_at, :end_at
  validates :days, presence: true,  numericality: { greater_than: 0 }

  belongs_to :rental
  belongs_to :user

  def self.find_by_user user
    where(user: user)
  end
end
