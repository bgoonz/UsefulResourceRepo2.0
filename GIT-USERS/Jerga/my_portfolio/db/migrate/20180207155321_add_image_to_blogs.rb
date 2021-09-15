class AddImageToBlogs < ActiveRecord::Migration[5.1]
  def change
    add_column :blogs, :main_image, :text
  end
end
