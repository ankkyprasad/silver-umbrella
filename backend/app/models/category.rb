# == Schema Information
#
# Table name: categories
#
#  id         :bigint           not null, primary key
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Category < ApplicationRecord
  has_many :blog_category_mappings, dependent: :delete_all
  has_many :blogs, through: :blog_category_mappings
end
