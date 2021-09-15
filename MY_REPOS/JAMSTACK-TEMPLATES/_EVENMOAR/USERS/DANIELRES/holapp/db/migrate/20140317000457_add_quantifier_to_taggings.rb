class AddQuantifierToTaggings < ActiveRecord::Migration
  def change
    add_column :taggings, :quantifier, :integer
  end
end
