Rails.application.routes.draw do
  namespace :admin do
    resources :users
    root to: "users#index"
  end

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :cards do
    member do
      patch :move
    end
  end

  resources :lists do
    member do
      patch :move
    end
  end

  mount ActionCable.server => '/cable'
  root to: 'lists#index'
end
