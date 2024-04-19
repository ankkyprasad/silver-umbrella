class AddScoreToBlogCategoryMappings < ActiveRecord::Migration[7.0]
  def change
    add_column :blog_category_mappings, :score, :integer, default: 5
  end
end
