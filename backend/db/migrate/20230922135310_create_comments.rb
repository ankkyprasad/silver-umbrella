class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :commentable_id, null: false
      t.string :commentable_type, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
