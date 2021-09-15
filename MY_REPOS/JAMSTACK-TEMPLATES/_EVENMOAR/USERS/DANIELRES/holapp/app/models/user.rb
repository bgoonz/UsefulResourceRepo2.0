class User < ActiveRecord::Base
  has_secure_token

  @@list_all = false

  attr_accessor :name

  default_scope { order('first_name', 'last_name') }

  def self.listable
    all
      .includes(memberships: [:project, :durations])
      .select(&:listable?)
  end

  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :first_name, uniqueness: { scope: :last_name, case_sensitive: false }

  devise :database_authenticatable, :registerable,
         :trackable, :validatable, :timeoutable,
         :omniauthable

  has_many :memberships, dependent: :destroy
  has_many :taggings, as: :taggable, dependent: :destroy

  has_many :projects, through: :memberships

  def self.enable_list_all!  ; @@list_all = true   ; end
  def self.disable_list_all! ; @@list_all = false  ; end
  def self.list_all?         ; @@list_all          ; end


  def initialize(options={})
    super
    set_first_and_last_name(options[:name])
  end

  def to_partial_path
    'people/person'
  end

  def name
    self.display_name.presence || first_name
  end

  def to_s
    name
  end

  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
      data = access_token.info
      user = User.where(:email => data["email"]).first

      # Uncomment the section below if you want users to be created if they don't exist
      # unless user
      #     user = User.create(name: data["name"],
      #        email: data["email"],
      #        password: Devise.friendly_token[0,20]
      #     )
      # end
      user
  end

  def listable?
    @@list_all || has_role?(:admin)
  end

  private

    def set_first_and_last_name(name)
      return unless name
      self.first_name = name.split(' ').first
      self.last_name  = name.split(' ')[1..-1].join(' ')
    end

end
