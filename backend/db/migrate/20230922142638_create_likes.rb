class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.integer :likable_id, null: false
      t.string :likable_type, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
