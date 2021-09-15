class Memberships < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.belongs_to :project
      t.belongs_to :user
      t.datetime :start_time
      t.datetime :end_time
      t.timestamps
    end
  end
end
