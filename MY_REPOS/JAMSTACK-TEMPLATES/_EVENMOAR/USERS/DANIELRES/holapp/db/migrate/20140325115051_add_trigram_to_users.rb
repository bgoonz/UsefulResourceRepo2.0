class AddTrigramToUsers < ActiveRecord::Migration
  def change
    add_column :users, :trigram, :string
  end
end
