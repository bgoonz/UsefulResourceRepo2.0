class User < ActiveRecord::Base
  include OmniAuthPopulator
  include Sluggable

  before_validation :generate_slug, :on => :create
  
  validates_uniqueness_of :slug
  validates_length_of :slug, :minimum => 1

  has_many :user_tokens do
    def facebook
      target.detect{|t| t.provider == 'facebook'}
    end

    def twitter
      target.detect{|t| t.provider == 'twitter'}
    end
  end

  has_many :sharings

  has_attached_file :photo,
                    :styles => {
                            :mini => "40x40#",
                            :thumb => "80x80#",
                            :small => "100x100#",
                            :big => "150x150#"
                    },
                    :default_url => "user_photos/missing_:style.png"

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :omniauthable, :validatable #:flexible_devise_validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name, :slug

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session[:omniauth]
        user.user_tokens.build(:provider => data['provider'], :uid => data['uid'])
      end
    end
  end

  def slug_source
    :raw_slug_text
  end

  def slug_scope
    []
  end

  def raw_slug_text
    return slug unless slug.nil?
    return name unless name.blank?
    return 'user'
  end

  def to_param
    slug
  end

  def apply_omniauth(omniauth)
    self.omniauth = omniauth
    user_tokens.build(:provider => omniauth['provider'], :uid => omniauth['uid'], :omniauth => omniauth)

    populate_photo_from_url(omniauth['user_info']['image']) unless photo.exists? || omniauth['user_info']['image'].blank?
  end

  def populate_from_twitter(omni)
    self.name = omni['user_info']['name'] if self.name.blank?
  end

  def populate_from_google_apps(omni)
    self.name = omni['user_info']['name'] if self.name.blank?
  end

  def populate_from_facebook(omni)
    self.name = omni['user_info']['name'] if self.name.blank?
    self.email = omni['user_info']['email'] if self.email.blank?
  end

#allows for account creation from twitter & fb
#allows saves w/o password
  def password_required?
    (!persisted? && user_tokens.empty?) || password.present? || password_confirmation.present?
  end

#allows for account creation from twitter
  def email_required?
    user_tokens.empty?
  end

  def remember_me
    super.nil? ? false : true
  end

  def tweet!(message, url=DEFAULT_SHARE_URL)
    twitter_client.update truncated_message_with_url(message, url)
  end

  def fb_post!(message, name=DEFAULT_FB_POST_NAME,
          description="TODO", url=DEFAULT_SHARE_URL, img=DEFAULT_FB_SHARE_IMAGE)
    options = {'access_token' => user_tokens.facebook.token,
               'message' => message,
               'link' => url,
               'picture' => img,
               'name' => name,
               'caption' => url,
               'description' => description
    }
    RestClient.post(URI.escape("https://graph.facebook.com/me/feed/"), options)
  end

  def connected_to?(provider)
    user_tokens.detect{|t| t.provider == provider.to_s} != nil
  end

  def display_name
    name || email
  end

  private

  def populate_photo_from_url(image_url)
    require 'open-uri'
    io = open(URI.parse(image_url))

    def io.original_filename;
      base_uri.path.split('/').last;
    end

    self.photo = io.original_filename.blank? ? nil : io
    #todo for now throw, not sire the error cases
  end

  def twitter_client
    client = TwitterOAuth::Client.new(
            :consumer_key => ::TWITTER_CONSUMER_KEY,
            :consumer_secret => ::TWITTER_SECRET_KEY,
            :token => user_tokens.twitter.token,
            :secret => user_tokens.twitter.secret
    )
  end

  def truncated_message_with_url(message="", url="", length=140)
    if message.size + url.size > 140
      share = message[0..(136-url.size)] + "..." + url
    else
      share = message + " " + url
    end
    share
  end
end
