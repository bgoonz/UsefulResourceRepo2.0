class CreateExpressions < ActiveRecord::Migration
  def change
    create_table :expressions do |t|
      t.text :body
      t.text :meaning
      t.integer :author_id
      t.integer :language_id

      t.timestamps
    end
  end
end
