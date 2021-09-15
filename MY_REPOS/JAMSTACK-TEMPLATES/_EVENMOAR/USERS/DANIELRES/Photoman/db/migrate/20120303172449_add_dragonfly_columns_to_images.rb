class AddDragonflyColumnsToImages < ActiveRecord::Migration
  def change
    rename_column :images, :location, :imagefile_uid
    add_column :images, :imagefile_name, :string
  end
end
