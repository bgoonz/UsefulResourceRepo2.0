class AddLanguageIdToTags < ActiveRecord::Migration
  def change
    add_column :tags, :language_id, :integer
  end
end
