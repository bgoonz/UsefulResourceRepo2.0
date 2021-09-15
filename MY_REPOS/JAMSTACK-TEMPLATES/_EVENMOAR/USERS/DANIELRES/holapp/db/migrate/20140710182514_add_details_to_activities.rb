class AddDetailsToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :details, :hstore
  end
end
