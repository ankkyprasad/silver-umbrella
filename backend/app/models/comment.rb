# == Schema Information
#
# Table name: comments
#
#  id               :bigint           not null, primary key
#  commentable_type :string(255)      not null
#  content          :text(65535)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  commentable_id   :integer          not null
#  user_id          :bigint           not null
#
# Indexes
#
#  index_comments_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Comment < ApplicationRecord
  VALID_COMMENTABLES = ['Blog'].freeze

  belongs_to :user
  belongs_to :commentable, polymorphic: true
  has_many :likes, as: :likable, dependent: :destroy

  validates :commentable_type,
            inclusion: { in: VALID_COMMENTABLES, message: '%<value>s is not a valid commentable type' }
end
