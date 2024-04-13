# == Schema Information
#
# Table name: blogs
#
#  id          :bigint           not null, primary key
#  description :text(65535)
#  image_url   :string(255)
#  title       :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_blogs_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Blog < ApplicationRecord
  belongs_to :user
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :likes, as: :likable, dependent: :delete_all
  has_many :blog_category_mappings, dependent: :delete_all
  has_many :categories, through: :blog_category_mappings
end
