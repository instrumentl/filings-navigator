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

ActiveRecord::Schema[7.0].define(version: 2023_03_31_115302) do
  create_table "awards", force: :cascade do |t|
    t.integer "filing_id", null: false
    t.integer "filer_ein", null: false
    t.integer "award_amount", null: false
    t.integer "recipient_ein", null: false
    t.text "purpose"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["filer_ein"], name: "index_awards_on_filer_ein"
    t.index ["filing_id"], name: "index_awards_on_filing_id"
    t.index ["recipient_ein", "filer_ein"], name: "index_awards_on_recipient_ein_and_filer_ein"
    t.index ["recipient_ein"], name: "index_awards_on_recipient_ein"
  end

  create_table "filers", force: :cascade do |t|
    t.integer "ein", null: false
    t.text "name", null: false
    t.text "line_1", null: false
    t.text "city", null: false
    t.text "state", null: false
    t.integer "zipcode", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "filings", force: :cascade do |t|
    t.datetime "return_timestamp", precision: nil, null: false
    t.text "amended_return_indicator"
    t.date "tax_period", null: false
    t.integer "filer_ein", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["filer_ein"], name: "index_filings_on_filer_ein"
  end

  create_table "recipients", force: :cascade do |t|
    t.integer "ein", null: false
    t.text "name", null: false
    t.text "line_1", null: false
    t.text "city", null: false
    t.text "state", null: false
    t.integer "zipcode", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
