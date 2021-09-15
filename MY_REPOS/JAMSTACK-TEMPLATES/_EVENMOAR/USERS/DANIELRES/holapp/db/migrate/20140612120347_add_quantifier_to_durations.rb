class AddQuantifierToDurations < ActiveRecord::Migration
  def change
    add_column :durations, :quantifier, :integer
  end
end
