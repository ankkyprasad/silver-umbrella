# frozen_string_literal: true

# == Schema Information
#
# Table name: user_category_feature_maps
#
#  id          :bigint           not null, primary key
#  score       :integer          default(5), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_user_category_feature_maps_on_category_id  (category_id)
#  index_user_category_feature_maps_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#  fk_rails_...  (user_id => users.id)
#
class UserCategoryFeatureMap < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :user_id, uniqueness: { scope: :category_id }
end
