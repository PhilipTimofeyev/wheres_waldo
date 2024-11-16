# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# SKI MOUNTAIN LEVEL
ski_mountain_level = Picture.create(
    title: "Ski Mountain",
    alt: "Winter Slopes",
    image_width: 3000,
    image_height: 1926
)

ski_mountain_level.image.attach(io: File.open("#{Rails.root}/app/assets/images/ski-mountain/ski-mountain.jpg"), filename: 'ski-mountain.jpg', content_type: 'image/jpg')

ski_waldo = ski_mountain_level.characters.create(name: "Waldo", x_coord: 2564, y_coord: 1380)
ski_waldo.image.attach(io: File.open("#{Rails.root}/app/assets/images/waldo-main.png"), filename: 'waldo-main.png', content_type: 'image/png')

# BEACH LEVEL
beach_level = Picture.create(
    title: "Beach",
    alt: "A Day At The Beach",
    image_width: 3000,
    image_height: 1926
)

beach_level.image.attach(io: File.open("#{Rails.root}/app/assets/images/beach/beach.jpg"), filename: 'beach.jpg', content_type: 'image/jpg')

# Waldo Character
beach_waldo = beach_level.characters.create(name: "Waldo", x_coord: 1850, y_coord: 730)
beach_waldo.image.attach(io: File.open("#{Rails.root}/app/assets/images/waldo-main.png"), filename: 'waldo-main.png', content_type: 'image/png')

# Icecream Dan
beach_icecream_dan = beach_level.characters.create(name: "Icecream Dan", x_coord: 2034, y_coord: 1715)
beach_icecream_dan.image.attach(io: File.open("#{Rails.root}/app/assets/images/beach/icecream-dan.png"), filename: 'icecream-dan.png', content_type: 'image/png')


# HEDGE LEVEL
hedge_level = Picture.create(
    title: "Hedge Maze",
    alt: "Garden Maze",
    image_width: 2444,
    image_height: 1525
)

hedge_level.image.attach(io: File.open("#{Rails.root}/app/assets/images/hedge-maze/hedge-maze.jpg"), filename: 'hedge-maze.jpg', content_type: 'image/jpg')

hedge_waldo = hedge_level.characters.create(name: "Waldo", x_coord: 1378, y_coord: 656)
hedge_waldo.image.attach(io: File.open("#{Rails.root}/app/assets/images/waldo-main.png"), filename: 'waldo-main.png', content_type: 'image/png')

# FISHING LEVEL
fishing_level = Picture.create(
    title: "Fishing",
    alt: "Deep Sea Fishing",
    image_width: 2000,
    image_height: 1861
)

fishing_level.image.attach(io: File.open("#{Rails.root}/app/assets/images/fishing/fishing.jpg"), filename: 'fishing.jpg', content_type: 'image/jpg')

fishing_waldo = fishing_level.characters.create(name: "Waldo", x_coord: 1318, y_coord: 828)
fishing_waldo.image.attach(io: File.open("#{Rails.root}/app/assets/images/waldo-main.png"), filename: 'waldo-main.png', content_type: 'image/png')
