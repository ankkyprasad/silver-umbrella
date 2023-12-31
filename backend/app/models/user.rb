# frozen_string_literal: true

# user model
class User < ApplicationRecord
  devise :database_authenticatable, :validatable, :api

  validates :name, presence: true

  has_many :blogs
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
end
