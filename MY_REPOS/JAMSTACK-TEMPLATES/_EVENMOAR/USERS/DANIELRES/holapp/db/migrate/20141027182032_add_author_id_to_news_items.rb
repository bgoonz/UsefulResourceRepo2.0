class AddAuthorIdToNewsItems < ActiveRecord::Migration
  def change
    add_column :news_items, :author_id, :integer
  end
end
