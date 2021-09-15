class CreateTrees < ActiveRecord::Migration
  def change
    create_table :trees do |t|
      t.string :common_name
      t.string :scientific_name
      t.integer :forest_id

      t.timestamps
    end
  end
end
