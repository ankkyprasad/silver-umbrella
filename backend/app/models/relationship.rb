# == Schema Information
#
# Table name: relationships
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  followee_id :integer          not null
#  follower_id :integer          not null
#
class Relationship < ApplicationRecord
  belongs_to :follower, class_name: 'User', foreign_key: :follower_id # user who followed
  belongs_to :followee, class_name: 'User', foreign_key: :followee_id # user who's being followed
end
