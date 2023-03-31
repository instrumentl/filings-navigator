Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :filers, only: [:index, :show]
    resources :filings, only: [:index, :show, :create]
    resources :recipients, only: [:index, :show]
    resources :awards, only: [:index, :show]
  end
end
