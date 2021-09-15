class User < ActiveRecord::Base

  extend FriendlyId
  friendly_id :name, use: :slugged

  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me, :confirmed_at, :role, :avatar_type

  has_many :expressions, :foreign_key => 'author_id'
  has_many :comments
  has_many :translations,:foreign_key => 'author_id'

  validates :name, :uniqueness => true
  validates :name, :presence => true

  def to_s
    name
  end
end
