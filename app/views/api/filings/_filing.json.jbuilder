json.extract! filing, :id, :return_timestamp, :amended_return_indicator, :tax_period
json.merge! filer_id: filing.filer.id
json.merge! filer_name: filing.filer.name