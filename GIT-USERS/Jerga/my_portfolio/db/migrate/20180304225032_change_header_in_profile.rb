class ChangeHeaderInProfile < ActiveRecord::Migration[5.1]
  def change
    change_column :profiles, :header, :text
  end
end
