class CreatePictures < ActiveRecord::Migration[7.2]
  def change
    create_table :pictures do |t|
      t.string :title
      t.string :alt

      t.timestamps
    end
  end
end
