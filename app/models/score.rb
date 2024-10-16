class Score < ApplicationRecord
  belongs_to :picture

  validates_uniqueness_of :username
end
