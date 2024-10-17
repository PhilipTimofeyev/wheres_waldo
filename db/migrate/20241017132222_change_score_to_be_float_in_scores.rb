class ChangeScoreToBeFloatInScores < ActiveRecord::Migration[7.2]
  def change
    change_column :scores, :score, :float
  end
end
