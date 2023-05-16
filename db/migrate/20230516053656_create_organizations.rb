class CreateOrganizations < ActiveRecord::Migration[7.0]
  def change
    create_table :organizations do |t|
      t.string :ein
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.string :name

      t.timestamps
    end
  end
end
