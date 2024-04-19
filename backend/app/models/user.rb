# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  name                   :string(255)
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  slug                   :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  devise :database_authenticatable, :validatable, :api

  validates :name, presence: true

  has_many :blogs
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :follow_users, class_name: 'Relationship', foreign_key: :follower_id
  has_many :follows, through: :follow_users, dependent: :delete_all, source: :followee
  has_many :following_users, class_name: 'Relationship', foreign_key: :followee_id
  has_many :followings, through: :following_users, dependent: :delete_all, source: :follower
  has_many :user_category_feature_maps, dependent: :delete_all

  after_create :generate_slug
  after_create :generate_feature_map

  INITIAL_FEATURE_VALUE = 5

  def generate_slug
    update!(slug: email.split('@').first)
  end

  def feature_map
    Vector.elements(UserCategoryFeatureMap.where(user_id: id).pluck(:score))
  end

  def recommended_blogs
    blogs = Blog.where.not(user_id: id).map do |blog|
      score = UserCategoryFeatureMap.similarity_score(self, blog)
      { blog:, score: }
    end

    blogs.sort_by { |blog| blog[:score] }.reverse
  end

  private

  def generate_feature_map
    feature_map = Category.pluck(:id).map { |category_id| { user_id: id, category_id: } }
    UserCategoryFeatureMap.create(feature_map)
  end
end
