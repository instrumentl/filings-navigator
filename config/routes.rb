Rails.application.routes.draw do
  root 'root#index'

  scope :api do
    get 'filers', to: 'api#filers'
    get 'filers/:id/filings', to: 'api#filings'
    get 'filings/:id/awards', to: 'api#awards'
    get 'recipients', to: 'api#recipients'
  end

end
