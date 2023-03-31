json.merge! total_pages: @recipients.total_pages
json.recipients(@recipients) do |recipient|
  json.partial! recipient, partial: "api/recipients/recipient", as: :recipient
end