User.create!(name: 'Alice', email: 'alice@test.com', password: 'password')

20.times do
  name = Faker::Name.name
  email = Faker::Internet.email
  password = Faker::Internet.password(min_length: 8, max_length: 20)
  User.create!(
    name:,
    email:,
    password:
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

100.times do
  title = Faker::Lorem.sentence(word_count: rand(5..10))
  description = Faker::Lorem.paragraph(sentence_count: rand(50..100))
  image_url = image_urls.sample
  user_id = User.all.sample.id
  sub_heading = rand(0..1) == 1 ? Faker::Lorem.sentence(word_count: rand(5..15)) : nil

  Blog.create!(
    title:,
    description:,
    image_url:,
    user_id:,
    sub_heading:
  )
end

p 'blogs created!'

50.times do
  Comment.create!(
    content: Faker::Quote.famous_last_words,
    commentable_id: Blog.all.sample.id,
    commentable_type: Comment::VALID_COMMENTABLES.sample,
    user_id: User.all.sample.id
  )
end

p 'comment created!'

400.times do
  resource = Like::VALID_LIKABLES.sample
  user_id = User.all.sample.id

  existing_liked_resources = Like.where(user_id: user_id, likable_type: resource).pluck(:likable_id)
  unliked_blogs = resource.constantize.where.not(id: existing_liked_resources)
  resource_id = unliked_blogs.sample.id

  Like.create!(
    likable_id: resource_id,
    likable_type: resource,
    user_id: user_id
  )
end

p 'likes created!'

categories = [
  'Personal Development',
  'Food',
  'Cooking',
  'History',
  'Technology',
  'Travel',
  'Health & Wellness',
  'Psychology',
  'Career',
  'Business',
  'Home & Garden',
  'Finance',
  'Lifestyle',
  'Entertainment',
  'Sustainability',
  'Photography',
  'Environment',
  'Writing & Publishing',
  'Beauty & Fashion',
  'Parenting',
  'Education',
  'Community',
  'Architecture',
  'Science',
  'Gaming',
  'Programming',
  'Relationships & Dating',
]

Category.create(categories.map { |name| { name: } })

p 'categories created'

500.times do
  blog = Blog.all.sample
  category = Category.where.not(id: blog.categories.pluck(:id)).sample
  BlogCategoryMapping.create!(blog:, category:)
end

p 'added categories to blogs'
