class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :body
      t.integer :project_id

      t.timestamps
    end
  end
end
