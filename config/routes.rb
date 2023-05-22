Rails.application.routes.draw do
  resources :products, only: [:edit, :update, :destroy]
  resources :projects do
    resources :products, only: [:index, :create]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "projects#index"
end
