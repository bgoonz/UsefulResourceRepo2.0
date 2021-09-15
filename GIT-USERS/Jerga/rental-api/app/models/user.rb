class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :name, length: { minimum: 4, maximum: 32 }

  has_many :rentals
  has_many :bookings

  # def self.find_by_email params
  #   where(email: (params[:data][:relationships][:user][:data][:id]))
  # end
end
