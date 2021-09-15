class UserToken < ActiveRecord::Base
  include OmniAuthPopulator

  belongs_to :user

  def populate_from_twitter(omni)
    self.secret = omni['credentials']['secret']
    self.token  = omni['credentials']['token']
    self.nickname  = omni['user_info']['nickname']
  end

  def populate_from_facebook(omni)
    self.token  = omni['credentials']['token']
    self.nickname  = omni['user_info']['nickname']
  end
end
