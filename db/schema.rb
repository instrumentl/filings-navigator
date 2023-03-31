# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 0) do
  create_table "filings" do |t|
    t.timestamp "return_timestamp", null: false
    t.text "amended_return_indicator"
    t.date "tax_period", null: false
    t.integer "filer_ein", null: false
  end

  add_index "filings", ["filer_ein"], name: "index_filings_on_filer"
  
  create_table "recipients" do |t|
    t.integer "ein", null: false
    t.text "name", null: false
    t.text "line_1", null: false
    t.text "city", null: false
    t.text "state", null: false
    t.integer "zipcode", null: false
  end
  
  create_table "awards" do |t|
    t.integer "filing_id", null: false
    t.integer "filer_ein", null: false
    t.integer "award_amount", null: false
    t.integer "recipient_ein", null: false
    t.text "purpose"
  end

  add_index "awards", ["recipient_ein", "filer_ein"], name: "index_awards_on_recipient_and_filer"
  add_index "awards", ["recipient_ein"], name: "index_awards_on_recipient"
  add_index "awards", ["filer_ein"], name: "index_awards_on_filer"
  add_index "awards", ["filing_id"], name: "index_awards_on_filing"

  create_table "filers" do |t|
    t.integer "ein", null: false
    t.text "name", null: false
    t.text "line_1", null: false
    t.text "city", null: false
    t.text "state", null: false
    t.integer "zipcode", null: false
  end
end
