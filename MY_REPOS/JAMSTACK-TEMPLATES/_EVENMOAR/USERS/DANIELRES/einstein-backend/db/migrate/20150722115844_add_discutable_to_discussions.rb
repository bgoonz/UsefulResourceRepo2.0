class AddDiscutableToDiscussions < ActiveRecord::Migration
  def change
    add_column :discussions, :discutable_id, :integer
    add_column :discussions, :discutable_type, :string
  end
end
