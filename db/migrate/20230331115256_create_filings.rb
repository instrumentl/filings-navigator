class CreateFilings < ActiveRecord::Migration[7.0]
  def change
    create_table :filings do |t|
      t.timestamp "return_timestamp", null: false
      t.text "amended_return_indicator"
      t.date "tax_period", null: false
      t.integer "filer_ein", null: false
      t.timestamps
    end
    add_index :filings, :filer_ein
  end
end
