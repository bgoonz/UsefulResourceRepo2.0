class AddUserToSharing < ActiveRecord::Migration
  def self.up
    add_column :sharings, :user_id, :integer
  end

  def self.down
  end
end
