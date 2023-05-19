class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :partnumber
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
