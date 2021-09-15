class CreateRentals < ActiveRecord::Migration[5.1]
  def change
    create_table :rentals do |t|
      t.string :title
      t.string :city
      t.string :category
      t.text :image
      t.decimal :bedrooms
      t.text :description
      t.decimal :daily_rate

      t.timestamps
    end
  end
end
