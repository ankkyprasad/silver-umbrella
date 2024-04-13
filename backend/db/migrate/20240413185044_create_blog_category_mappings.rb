class CreateBlogCategoryMappings < ActiveRecord::Migration[7.0]
  def change
    create_table :blog_category_mappings do |t|
      t.references :blog, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
