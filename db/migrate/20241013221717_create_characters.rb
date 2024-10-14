class CreateCharacters < ActiveRecord::Migration[7.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.float :x_coord
      t.float :y_coord
      t.references :picture, null: false, foreign_key: true

      t.timestamps
    end
  end
end
