class AddPositionToPortfolios < ActiveRecord::Migration[5.1]
  def change
    add_column :portfolios, :position, :integer
  end
end
