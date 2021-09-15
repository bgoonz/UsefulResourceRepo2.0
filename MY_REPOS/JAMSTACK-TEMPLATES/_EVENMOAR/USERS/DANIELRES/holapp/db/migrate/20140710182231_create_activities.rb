class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.integer :user_id
      t.string :action
      t.string :object_type
      t.string :object_id
      t.timestamps
    end
  end
end
