class AddStatusCodeToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :status_code, :integer, :default => 0
  end
end
