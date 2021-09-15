class AddSourceInfoAndSourceTypeToExpressions < ActiveRecord::Migration
  def change
    add_column :expressions, :source_type, :string
    add_column :expressions, :source_info, :text
  end
end
