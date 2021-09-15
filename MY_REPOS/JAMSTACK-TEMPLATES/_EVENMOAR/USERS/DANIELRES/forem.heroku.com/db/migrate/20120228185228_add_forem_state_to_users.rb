class AddForemStateToUsers < ActiveRecord::Migration
  def change
    add_column :users, :forem_state, :string, :default => 'pending_review'
  end
end
