class AddLanguageToNewsItems < ActiveRecord::Migration
  def change
    add_column :news_items, :language, :string, default: 'en'
  end
end
