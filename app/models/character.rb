class Character < ApplicationRecord
  belongs_to :picture
  has_one_attached :image
end
