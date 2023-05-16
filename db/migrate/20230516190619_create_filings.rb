class CreateFilings < ActiveRecord::Migration[7.0]
  def change
    create_table :filings do |t|
      t.integer :filer_id
      t.boolean :amended_return
      t.datetime :return_timestamp

      t.timestamps
    end
  end
end
