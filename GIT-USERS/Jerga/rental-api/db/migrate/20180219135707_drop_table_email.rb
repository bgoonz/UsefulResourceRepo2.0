class DropTableEmail < ActiveRecord::Migration[5.1]
  def down
    drop_table :emails
  end
end
