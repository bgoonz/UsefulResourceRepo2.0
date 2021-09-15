class CreateDiscussionEntries < ActiveRecord::Migration
  def change
    create_table :discussion_entries do |t|
      t.text :body
      t.integer :discussion_id
      t.integer :author_id

      t.timestamps null: false
    end
  end
end
