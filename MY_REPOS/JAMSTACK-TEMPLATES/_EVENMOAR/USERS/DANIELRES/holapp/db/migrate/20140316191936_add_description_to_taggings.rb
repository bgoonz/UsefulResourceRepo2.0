class AddDescriptionToTaggings < ActiveRecord::Migration
  def change
    add_column :taggings, :description, :text
  end
end
