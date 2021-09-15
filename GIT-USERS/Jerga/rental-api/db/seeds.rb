# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


2.times do |d|
  Rental.create!(
    title: "Grand old mansion #{d}",
    city: 'San Francisco',
    category: 'Estate',
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg",
    bedrooms: 15,
    description: "Very nice mansion",
    daily_rate: 199
    )
end

3.times do |d|
  Rental.create!(
    title: "Villa san Sebastian #{d}",
    city: 'Kosice',
    category: 'Estate',
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg",
    bedrooms: 15,
    description: "Very nice mansion",
    daily_rate: 199
    )
end

3.times do |d|
  Rental.create!(
    title: "Bratislavsky hrad #{d}",
    city: 'Bratislava',
    category: 'Estate',
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg",
    bedrooms: 15,
    description: "Very nice mansion",
    daily_rate: 199
    )
end
