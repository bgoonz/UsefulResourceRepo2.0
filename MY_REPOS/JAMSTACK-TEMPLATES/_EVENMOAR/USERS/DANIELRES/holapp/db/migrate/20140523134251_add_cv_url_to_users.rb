class AddCvUrlToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cv_url, :string
  end
end
