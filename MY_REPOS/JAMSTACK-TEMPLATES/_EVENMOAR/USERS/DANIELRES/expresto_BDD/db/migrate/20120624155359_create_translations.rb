class CreateTranslations < ActiveRecord::Migration
  def change
    create_table :translations do |t|
      t.integer :expression_id
      t.integer :language_id
      t.string :body_litteral
      t.string :body_semantic
      t.integer :author_id

      t.timestamps
    end
  end
end
