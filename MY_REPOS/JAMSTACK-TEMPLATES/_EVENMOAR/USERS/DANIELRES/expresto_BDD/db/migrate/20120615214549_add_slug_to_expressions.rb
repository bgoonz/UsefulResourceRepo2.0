class AddSlugToExpressions < ActiveRecord::Migration
  def change
    add_column :expressions, :slug, :string
    add_index :expressions, :slug, unique: true
  end
end
