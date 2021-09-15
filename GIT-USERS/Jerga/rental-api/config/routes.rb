Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'api/v1/registrations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post :auth, to: "authentication#create"
      resources :rentals do
      end
      resources :bookings do
      end
      devise_scope :user do
        post 'users', to: 'registrations#create'
      end
    end
  end
end
