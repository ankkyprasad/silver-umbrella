class CreateUserCategoryFeatureMaps < ActiveRecord::Migration[7.0]
  def change
    create_table :user_category_feature_maps do |t|
      t.references :user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.integer :score, null: false, default: 5

      t.timestamps
    end
  end
end
