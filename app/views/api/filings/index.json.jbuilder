json.merge! total_pages: @filings.total_pages
json.filings(@filings) do |filing|
  json.partial! filing, partial: "api/filings/filing", as: :filing
end
