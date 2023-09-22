class Like < ApplicationRecord
  VALID_LIKABLES = ['Comment'].freeze

  belongs_to :user
  belongs_to :likable, polymorphic: true

  validates :likable_type, inclusion: { in: VALID_LIKABLES, message: '%<value>s is not a valid likable type' }

  def self.exists_for_user?(likable_id, likable_type, user_id)
    Like.exists?(likable_id: likable_id, likable_type: likable_type, user_id: user_id)
  end
end
