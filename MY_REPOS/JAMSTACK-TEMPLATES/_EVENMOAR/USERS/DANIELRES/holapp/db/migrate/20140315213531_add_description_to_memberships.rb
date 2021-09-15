class AddDescriptionToMemberships < ActiveRecord::Migration
  def change
    add_column :memberships, :description, :text
  end
end
