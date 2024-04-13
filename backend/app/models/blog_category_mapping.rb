# == Schema Information
#
# Table name: blog_category_mappings
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  blog_id     :bigint           not null
#  category_id :bigint           not null
#
# Indexes
#
#  index_blog_category_mappings_on_blog_id      (blog_id)
#  index_blog_category_mappings_on_category_id  (category_id)
#
# Foreign Keys
#
#  fk_rails_...  (blog_id => blogs.id)
#  fk_rails_...  (category_id => categories.id)
#
class BlogCategoryMapping < ApplicationRecord
  belongs_to :blog
  belongs_to :category
end
