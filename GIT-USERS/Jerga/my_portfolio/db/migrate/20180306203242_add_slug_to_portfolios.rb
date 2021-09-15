class AddSlugToPortfolios < ActiveRecord::Migration[5.1]
  def change
    add_column :portfolios, :slug, :string
    add_index :portfolios, :slug, unique: true
  end
end
