class AddSlugsToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :slug, :string
  end

  def self.down
    remove_column :users, :slug
  end
end
