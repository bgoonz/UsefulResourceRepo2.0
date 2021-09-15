class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.text :body
      t.datetime :created_at
      t.datetime :updated_at
      t.integer :author_id

      t.timestamps
    end
  end
end
