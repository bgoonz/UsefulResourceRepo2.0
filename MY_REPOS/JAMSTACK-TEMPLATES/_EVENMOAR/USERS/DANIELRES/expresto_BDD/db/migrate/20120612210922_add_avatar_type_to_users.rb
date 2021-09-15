class AddAvatarTypeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :avatar_type, :string

  end
end
