class CreateScores < ActiveRecord::Migration[7.2]
  def change
    create_table :scores do |t|
      t.string :username
      t.integer :score
      t.references :picture, null: false, foreign_key: true

      t.timestamps
    end
  end
end
