class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :tag_id
      t.integer :taggable_id
      t.string :taggable_type

      t.timestamps
    end
  end
end
