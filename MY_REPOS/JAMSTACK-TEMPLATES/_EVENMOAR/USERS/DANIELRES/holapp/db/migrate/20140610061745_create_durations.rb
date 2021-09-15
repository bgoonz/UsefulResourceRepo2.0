class CreateDurations < ActiveRecord::Migration
  def change
    create_table :durations do |t|
      t.datetime :starts_at
      t.datetime :ends_at
      t.integer :durable_id
      t.string :durable_type

      t.timestamps
    end
  end
end
