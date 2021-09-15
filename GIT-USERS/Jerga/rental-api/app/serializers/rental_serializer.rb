class RentalSerializer < ActiveModel::Serializer
  attributes :id, :title, :city, :category, :image, :bedrooms, :description, :daily_rate, :created_at
  belongs_to :user
  has_many :bookings
end
