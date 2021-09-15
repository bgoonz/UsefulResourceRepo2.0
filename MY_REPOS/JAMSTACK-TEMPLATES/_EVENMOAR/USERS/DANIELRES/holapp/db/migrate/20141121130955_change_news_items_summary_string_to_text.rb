class ChangeNewsItemsSummaryStringToText < ActiveRecord::Migration
  def up
      change_column :news_items, :summary, :text
  end
  def down
      change_column :news_items, :summary, :string
  end
end
