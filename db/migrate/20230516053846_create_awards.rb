class CreateAwards < ActiveRecord::Migration[7.0]
  def change
    create_table :awards do |t|
      t.string :purpose
      t.decimal :amount
      t.string :tax_period
      t.integer :filing_id
      t.integer :recipient_id

      t.timestamps
    end
  end
end
