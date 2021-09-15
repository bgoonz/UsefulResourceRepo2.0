class CreateForests < ActiveRecord::Migration
  def change
    create_table :forests do |t|
      t.string :name
      t.integer :size
      t.integer :latitude
      t.integer :longitude
      t.string :climate

      t.timestamps
    end
  end
end
