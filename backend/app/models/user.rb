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
  has_many :follow_users, class_name: 'Relationship', foreign_key: :followee_id
  has_many :follows, through: :follow_users, dependent: :delete_all, source: :follower
  has_many :following_users, class_name: 'Relationship', foreign_key: :follower_id
  has_many :followings, through: :following_users, dependent: :delete_all, source: :followee

  after_create :generate_slug

  def generate_slug
    update!(slug: email.split('@').first)
  end
end
