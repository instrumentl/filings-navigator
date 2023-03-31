json.merge! total_pages: @filers.total_pages
json.filers(@filers) do |filer|
  json.partial! filer, partial: "api/filers/filer", as: :filer
end