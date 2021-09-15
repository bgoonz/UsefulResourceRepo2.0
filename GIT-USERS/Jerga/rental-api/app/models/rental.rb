class Rental < ApplicationRecord
  validates_presence_of :title, :city, :category, :description, :daily_rate, :image
  validates :title, length: { minimum: 2, maximum: 64 }
  validates :city, length: { minimum: 2, maximum: 32 }
  validates :description, length: { minimum: 64, maximum: 1024 }
  validates :daily_rate, numericality: { greater_than: 0 }

  mount_uploader :image, RentalUploader

  belongs_to :user
  has_many :bookings, dependent: :destroy

  def self.find_by_user user
    where(user: user)
  end

  def self.user rental_id
    where(id: rental_id).first.user
  end

  def self.find_by_city params
    page = (params[:page] || 1).to_i

    if params[:city] && !params[:city].empty?
      self.page(1).per(params[:per_page]).where("lower(city) like lower(?)", "#{params[:city]}%")
    else
      self.page(page).per(params[:per_page])
    end
  end

  def available_between?(date_begin, date_end)
    conflicting_bookings = self.bookings.where.not("(start_at < :requested_start_date AND end_at < :requested_start_date) OR (end_at > :requested_end_date AND start_at > :requested_end_date)", requested_start_date: date_begin, requested_end_date: date_end)

    return conflicting_bookings.count > 0 ? false : true;
  end
end
