# README

## Stack
- Ruby on Rails
- ReactJS Frontend
- Tailwind CSS

## Setup & Run
- `bundle install`
- `rails db:migrate`
- `rails db:seed`
- `./bin/dev`

## Cut Corners
- Address/City/State in a real app would probably be broken out into seperate models
- Depending on complexity Tax periods might be broken out into models, using string of the year for simplicity
- Might use seperate service for creating an organization
- In a larger environment with more data intakes we would probably be batching processes and divying out into background worker tasks, such as with Sidekiq
- I noticed with some data the state was missing. In real example we could be doing lookups on this using the zip.
- Used a single api controller rather than breaking up across resources
- Only using strong parameters for awards since that's the only added filter (extra params)
- Added only very basic tests for validation
- Ideally we should add test around the `filing_intake_service.rb` as it is brittle in its current state

## Notes
- Data intake is being done via `seeds.rb` but could also be run from the console using
`file_load = [
  "990-xmls/201612429349300846_public.xml",
  "990-xmls/201831309349303578_public.xml",
  "990-xmls/201641949349301259_public.xml",
  "990-xmls/201921719349301032_public.xml",
  "990-xmls/202141799349300234_public.xml",
  "990-xmls/201823309349300127_public.xml",
  "990-xmls/202122439349100302_public.xml",
  "990-xmls/201831359349101003_public.xml"
]`

`service = FilingsIntakeService.new(file_load)
service.call`

## Requirements
- [x] Parse and store ein, name, address, city, state, zip code info for both filers and recipients
- [x] Parse and store award attributes, such as purpose, cash amount, and tax period
- [x] API: Serialized filers: `http://localhost:3000/api/filers`
- [x] API: Serialized filings by filer: `http://localhost:3000/api/filers/1/filings`
- [x] API: Serialized awards by filing: `/api/filings/1/awards`
- [x] API: Serialized recipients: `http://localhost:3000/api/recipients`
- [X] Consider additional request parameters: Awards api call includes a filter to limit results by the minimum amount value: `/api/filings/1/awards?min_value=20000`

- [x] Frontend: Explore historical filings of a filer and open Awards data linked to a filing
- [x] Deploy to Heroku: https://bretmatic-filings-navigator.herokuapp.com/




## How to deliver your code

Please fork this repo into a Github repository and share access with the following Github accounts.

- [@eyupatis](https://github.com/eyupatis)
- [@gsinkin-instrumentl](https://github.com/gsinkin-instrumentl)
- [@furkan-instrumentl](https://github.com/furkan-instrumentl)
- [@hope-instrumentl](https://github.com/hope-instrumentl)
- [@instrumentl707](https://github.com/instrumentl707)
- [@roguelazer](https://github.com/roguelazer)
- [@asuratte-instrumentl](https://github.com/asuratte-instrumentl)
- [@okan-instrumentl](https://github.com/okan-instrumentl)
- [@bhasty-instrumentl](https://github.com/bhasty-instrumentl)
- [@bchaney](https://github.com/bchaney)

## Questions or Issues

Please don’t hesitate to contact engineering@instrumentl.com
