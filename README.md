# README

## Installation

- `bundle install`

## Prepare DB

- `rake db:migrate`
- **_ TODO _**

## Running the server

- `rails s`

### Total time: ~12 hours

## Background Information

Every year, US Nonprofit organizations submit tax returns to the IRS. The tax returns are converted into XML and made available by the IRS. These tax returns contain information about the nonprofit’s giving and/or receiving for the tax period. For this coding project, we will focus on the nonprofit’s attributes and the awards that they gave or received in a particular tax year.

These Organizations may file their taxes multiple times in a year (also known as filing amended returns). Only one return is considered valid, however. The valid return is the one with the most recent `ReturnTimestamp` (and/or the one with the `Amended Return Indicator`).

## Key Definitions

- Filers are nonprofit organizations that submit tax return data to the IRS.
- Awards are grants given by the filer to nonprofit organizations in a given year.
- Recipients are nonprofit organizations who have received awards given by a filer.
- Filings are the individual tax returns submitted by filers to the IRS for a given tax period. A filing contains awards given by the filer to recipients.

Example: "The filer’s 2015 filing declares that they gave 18 awards to 12 different recipients totalling $118k in giving"

## Backend Requirements

**Build a Rails or Sinatra web application that parses the IRS XML and stores the data into a database**

- Parse and store ein, name, address, city, state, zip code info for both filers and recipients
- Parse and store award attributes, such as purpose, cash amount, and tax period
- Generate an API to access the data. This API should support
  - Serialized filers
  - Serialized filings by filer
  - Serialized awards by filing
  - Serialized recipients
- Consider additional request parameters by endpoint (e.g. filter recipients by filing, filter recipients by state, filter recipients by cash amount, pagination, etc).
- Be sure to read the [Frontend Requirements](#frontend-requirements) when building and extending the API!
- Bonus points for deploying to Heroku

## Filing Urls

- https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201612429349300846_public.xml
- https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201831309349303578_public.xml
- https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201641949349301259_public.xml
- https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201921719349301032_public.xml
- https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/202141799349300234_public.xml
- https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201823309349300127_public.xml
- https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/202122439349100302_public.xml
- https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201831359349101003_public.xml

## Paths and Keys in XMLs for Related Data

- Filing Path: `Return/ReturnHeader`
  - Return Timestamp: `{ReturnTs}`
  - Tax Period: `{TaxPeriodEndDt,TaxPeriodEndDate}`
- Filer Path: `Return/ReturnHeader/Filer`
  - EIN: `EIN`
  - Name: `{Name,BusinessName}/{BusinessNameLine1,BusinessNameLine1Txt}`
  - Address: `{USAddress,AddressUS}`
  - Line 1: `{AddressLine1,AddressLine1Txt}`
  - City: `{City,CityNm}`
  - State: `{State,StateAbbreviationCd}`
  - Zip: `{ZIPCode,ZIPCd}`
- Award List Path: `Return/ReturnData/IRS990ScheduleI/RecipientTable`
  - Amended Return Indicator: `{AmendedReturnInd}`
  - EIN: `{EINOfRecipient,RecipientEIN}`
  - Recipient Name: `{RecipientNameBusiness,RecipientBusinessName}/{BusinessNameLine1,BusinessNameLine1Txt}`
  - Recipient Address: `{USAddress,AddressUS}`
    - Line 1: `{AddressLine1,AddressLine1Txt}`
    - City: `{City,CityNm}`
    - State: `{State,StateAbbreviationCd}`
    - Zip: `{ZIPCode,ZIPCd}`
  - Award Amount: `{AmountOfCashGrant,CashGrantAmt}`

\* Paths may vary by schema version

## Frontend Requirements

Go ahead and show off! Build something fun that utilizes the API. Consider building a UI that enables a customer to explore the historical giving of a filer. What information is relevant? How should someone navigate the data? Obviously, you don’t have infinite time, so feel free to stub out functionality or leave comments for things you didn’t get around to finishing. We understand!

The only requirements for the frontend are that you leverage your new API in Javascript (please, no Backbone.js).

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

## Questions or Issues

Please don’t hesitate to contact engineering@instrumentl.com
