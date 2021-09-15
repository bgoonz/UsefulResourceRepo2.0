class CreateNewsUserConfigs < ActiveRecord::Migration
  def change
    create_table :news_user_configs do |t|
      t.integer :user_id
      t.datetime :digest_sent_at
      t.boolean :receive_digest
      t.timestamps
    end
  end
end
