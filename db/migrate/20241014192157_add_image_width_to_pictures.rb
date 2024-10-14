class AddImageWidthToPictures < ActiveRecord::Migration[7.2]
  def change
    add_column :pictures, :image_width, :integer
    add_column :pictures, :image_height, :integer
  end
end
