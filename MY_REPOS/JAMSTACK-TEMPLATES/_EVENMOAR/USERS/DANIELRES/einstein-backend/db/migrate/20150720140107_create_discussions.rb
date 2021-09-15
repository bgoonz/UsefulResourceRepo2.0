class CreateDiscussions < ActiveRecord::Migration
  def change
    create_table :discussions do |t|
      t.string :title
      t.integer :author_id
    end
  end
end
