class CreateAwards < ActiveRecord::Migration[7.0]
  def change
    create_table :awards do |t|
      t.integer "filing_id", null: false
      t.integer "filer_ein", null: false
      t.integer "award_amount", null: false
      t.integer "recipient_ein", null: false
      t.text "purpose"
      t.timestamps
    end
    add_index :awards, [:recipient_ein, :filer_ein]
    add_index :awards, :recipient_ein
    add_index :awards, :filer_ein
    add_index :awards, :filing_id
  end
end
