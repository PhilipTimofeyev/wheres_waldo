class Picture < ApplicationRecord
  has_one_attached :image
  has_many :characters, dependent: :destroy
  has_many :scores, dependent: :destroy
end
