class DropTableUsers < ActiveRecord::Migration[5.1]
  def down
    drop_table :users
  end
end
