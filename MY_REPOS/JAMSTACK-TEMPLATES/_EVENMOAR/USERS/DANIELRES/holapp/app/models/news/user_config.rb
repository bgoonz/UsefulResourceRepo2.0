class News::UserConfig < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  def refresh_digest_sent_at!
    self.digest_sent_at = Time.now
    save!
  end


  def to_s
    "user config"
  end

end
