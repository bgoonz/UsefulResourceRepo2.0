class CreateLanguages < ActiveRecord::Migration
  def change
    create_table :languages do |t|
      t.string :english_name
      t.string :native_name
      t.string :code

      t.timestamps
    end
  end
end
