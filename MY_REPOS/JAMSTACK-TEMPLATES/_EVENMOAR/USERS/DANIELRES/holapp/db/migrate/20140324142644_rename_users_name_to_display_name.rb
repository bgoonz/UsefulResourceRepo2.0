class RenameUsersNameToDisplayName < ActiveRecord::Migration
  def change
    rename_column :users, :name, :display_name
  end
end
