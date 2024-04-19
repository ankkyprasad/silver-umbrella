# frozen_string_literal: true

require 'matrix'

# == Schema Information
#
# Table name: blogs
#
#  id          :bigint           not null, primary key
#  description :text(65535)
#  image_url   :string(255)
#  sub_heading :string(255)
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

  def similarity_score(other_blog)
    current_blog_vector = feature_map
    other_blog_vector = other_blog.feature_map

    numerator = current_blog_vector.inner_product(other_blog_vector)
    denominator = current_blog_vector.r * other_blog_vector.r

    (numerator / denominator * 100).to_i
  end

  def feature_map
    scores = blog_category_mappings.pluck(:category_id, :score).map { |id, score| [id, score] }.to_h
    Vector.elements(Category.pluck(:id).map { |category_id| scores.fetch(category_id, 0) })
  end
end
