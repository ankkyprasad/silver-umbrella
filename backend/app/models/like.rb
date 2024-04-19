# frozen_string_literal: true

# == Schema Information
#
# Table name: likes
#
#  id           :bigint           not null, primary key
#  likable_type :string(255)      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  likable_id   :integer          not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_likes_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Like < ApplicationRecord
  VALID_LIKABLES = %w[Comment Blog].freeze

  belongs_to :user
  belongs_to :likable, polymorphic: true

  validates :likable_type, inclusion: { in: VALID_LIKABLES, message: '%<value>s is not a valid likable type' }
  validates :user_id, uniqueness: { scope: %i[likable_id likable_type], message: 'has already liked this entity' }

  after_create :update_users_feature_map

  def self.exists_for_user?(likable_id, likable_type, user_id)
    Like.exists?(likable_id:, likable_type:, user_id:)
  end

  def update_users_feature_map; end
end
