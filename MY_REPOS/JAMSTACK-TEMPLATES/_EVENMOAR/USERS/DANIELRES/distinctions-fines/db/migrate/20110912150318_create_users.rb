class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :display_name
      t.datetime :created_at
      t.datetime :updtated_at

      t.timestamps
    end
  end
end
