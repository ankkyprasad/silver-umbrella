# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create!(name: 'Alice', email: 'alice@test.com', password: 'password')

20.times do
  name = Faker::Name.name
  email = Faker::Internet.email
  password = Faker::Internet.password(min_length: 8, max_length: 20)
  User.create!(
    name: name,
    email: email,
    password: password
  )
end

p 'users created!'

image_urls = [
  'https://fastly.picsum.photos/id/3/1000/300.jpg?hmac=B1bJNphsw-_3FXHdL9sWhRRubuIbknhB806pPK4LZJw',
  'https://fastly.picsum.photos/id/401/1000/300.jpg?hmac=z_x0IZCsELi6H7ZZXhMy3X-srKwcNESrfFEevKWpUo4',
  'https://fastly.picsum.photos/id/738/1000/300.jpg?hmac=DQWhB-ZBNPIHeFDso6JBhtTzf9iIM7RwLC2xmnBf_LI',
  'https://fastly.picsum.photos/id/269/800/300.jpg?hmac=bb3uVkWCmnvmR7tHs_eXRqZ8XqWQGHQ6fsrxKn8uzl4',
  'https://fastly.picsum.photos/id/45/1000/300.jpg?hmac=SxRzoh_a9UTLZ4Q857WBGkUVXFH2VOiaByScF_d3Dp8',
  'https://fastly.picsum.photos/id/116/1000/300.jpg?hmac=JKU45336EX8YvirK6TrBMFkmYZ_TsYZtHiQLsPZUy5w',
  'https://fastly.picsum.photos/id/532/1000/300.jpg?hmac=UK6UiEWZFhpbtycvPcjZZtEEESYIjJg2iQQtBQHJkT4',
  'https://fastly.picsum.photos/id/15/1000/300.jpg?hmac=uRw9ThB12qvKl3cHparYYbW2vtoEeWxjptJ9IDgc1q0'
]

40.times do
  title = Faker::Lorem.sentence(word_count: 5)
  description = Faker::Lorem.paragraph(sentence_count: 4)
  image_url = image_urls.sample
  user_id = rand(2..21)

  Blog.create!(
    title: title,
    description: description,
    image_url: image_url,
    user_id: user_id
  )
end

p 'blogs created!'
