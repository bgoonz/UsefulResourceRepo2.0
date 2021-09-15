class BookingSerializer < ActiveModel::Serializer
  attributes :id, :days, :start_at, :end_at, :guests, :total_price, :created_at
  belongs_to :rental
  belongs_to :user
end
