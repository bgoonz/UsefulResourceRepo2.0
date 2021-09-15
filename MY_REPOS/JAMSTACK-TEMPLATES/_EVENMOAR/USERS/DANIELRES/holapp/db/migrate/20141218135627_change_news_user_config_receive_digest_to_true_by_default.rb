class ChangeNewsUserConfigReceiveDigestToTrueByDefault < ActiveRecord::Migration
  def change
    change_column :news_user_configs, :receive_digest, :boolean, :default => true

  end
end
