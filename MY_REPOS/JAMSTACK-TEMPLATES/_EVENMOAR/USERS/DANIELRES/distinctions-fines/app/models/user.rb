class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable


  # Setup accessible (or protected) attributes for your model
  attr_accessible :display_name, :email, :password, :password_confirmation, :remember_me
  
  
  has_many :articles, :foreign_key => :author_id
  
  validates :display_name, :email, :presence => true

  has_many :authentications


  
  
  def to_s
    display_name
  end
  
  def has_role?(role)
    if role == :admin
      true if id == 2
    end
  end
  
end
