class Picture < ApplicationRecord
  has_one_attached :image
  has_many :characters
end
