# frozen_string_literal: true

# user model
class User < ApplicationRecord
  devise :database_authenticatable, :validatable, :api

  validates :name, presence: true

  has_many :blogs
end
