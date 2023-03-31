json.extract! award, :id, :filing_id, :award_amount, :purpose
json.merge! recipient_name: award.recipient.name
json.merge! recipient_id: award.recipient.id
json.merge! filer_name: award.filer.name
json.merge! filer_id: award.filer.id
json.merge! filing_tax_period: award.filing.tax_period