class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :title
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps
    end
  end
end
