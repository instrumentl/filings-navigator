class CreateRecipients < ActiveRecord::Migration[7.0]
  def change
    create_table :recipients do |t|
      t.integer "ein", null: false
      t.text "name", null: false
      t.text "line_1", null: false
      t.text "city", null: false
      t.text "state", null: false
      t.integer "zipcode", null: false
      t.timestamps
    end
  end
end
