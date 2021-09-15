class AddCreatedByAuthorToExpressions < ActiveRecord::Migration
  def change
    add_column :expressions, :created_by_author, :boolean

  end
end
