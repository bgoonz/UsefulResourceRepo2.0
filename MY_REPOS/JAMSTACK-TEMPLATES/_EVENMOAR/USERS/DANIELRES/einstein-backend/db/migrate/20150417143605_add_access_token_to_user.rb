class AddAccessTokenToUser < ActiveRecord::Migration
  def change
    add_column :users, :access_token, :string
    add_column :users, :username, :string
  end
end
