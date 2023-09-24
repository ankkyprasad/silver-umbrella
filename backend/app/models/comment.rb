class Comment < ApplicationRecord
  VALID_COMMENTABLES = ['Blog'].freeze

  belongs_to :user
  # belongs_to :commentable, polymorphic: true
  has_many :likes, as: :likable, dependent: :destroy

  validates :commentable_type, inclusion: { in: %w[Blog], message: '%<value>s is not a valid commentable type' }
end
