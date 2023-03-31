json.merge! total_pages: @awards.total_pages
json.awards(@awards) do |award|
  json.partial! award, partial: "api/awards/award", as: :award
end