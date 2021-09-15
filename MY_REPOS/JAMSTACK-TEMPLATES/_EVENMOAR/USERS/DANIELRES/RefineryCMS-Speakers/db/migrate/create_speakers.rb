class CreateSpeakers < ActiveRecord::Migration

  def self.up
    create_table :speakers do |t|
      t.string :firstname
      t.string :lastname
      t.integer :image_id
      t.text :description
      t.integer :position

      t.timestamps
    end

    add_index :speakers, :id

    load(Rails.root.join('db', 'seeds', 'speakers.rb'))
  end

  def self.down
    if defined?(UserPlugin)
      UserPlugin.destroy_all({:name => "speakers"})
    end

    if defined?(Page)
      Page.delete_all({:link_url => "/speakers"})
    end

    drop_table :speakers
  end

end
