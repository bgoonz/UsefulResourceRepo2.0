class CreateNews < ActiveRecord::Migration
  def change
    create_table :news do |t|
      t.text :body_en
      t.text :body_fr
      t.integer :author_id
      t.datetime :published_at
      t.timestamps
    end
  end
end
