class CreateSharings < ActiveRecord::Migration
  def self.up
    create_table :sharings do |t|
      t.string :content

      t.timestamps
    end
  end

  def self.down
    drop_table :sharings
  end
end
