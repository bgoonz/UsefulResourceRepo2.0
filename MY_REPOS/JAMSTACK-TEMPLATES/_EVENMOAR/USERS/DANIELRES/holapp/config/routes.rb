Marketplace::Application.routes.draw do

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :people, path: 'users', only: [:show]
  resources :people, only:  [:create, :update, :destroy]
  resources :users
  post :generate_new_token, to: 'users#generate_new_token', as: 'generate_new_token'
  resources :projects
  resources :memberships
  resources :taggings, only: [ :create, :update, :destroy, :show ]
  resources :durations, only: [ :create, :update, :destroy, :show ]

  resources :tags, only: [ :index, :show, :update, :destroy ]
  resources :activities, only: [ :index ]
  post "/tags/merge_tags", to: "tags#merge_tags", as: 'merge_tags'
  get "/tags/autocomplete/results.json", to: "tags#autocomplete"
  devise_scope :user do
    get "users/auth/google_oauth2/callback", to: "oauth#google"
  end
  get "/cvs", to: "cvs#index", as: 'cvs'

  get "/config", to: "user_configs#index", as: 'user_configs'
  get "/admin",  to: "admin#index", as: 'admin'
  get "/admin",  to: "admin#index", as: 'news_admin'
  get "/admin",  to: "admin#index", as: 'roles_admin'


  namespace :news do
    resources :items, path: '/'
    resources :user_configs
    get "/digest/preview(/:user_id)", to: 'digests#preview'             , as: 'preview_digest'
    get "/digests/dry_run"          , to: 'digests#dry_run_send_digests', as: 'dry_run_send_digests'
    get "/digests/send"             , to: 'digests#send_digests'        , as: 'send_digests'
  end

  namespace :forecasts do
    get ":periodicity/:start_year/:start_month/+:months_duration/",
        defaults: {
              periodicity: 'half-monthly',
               start_year: Date.today.year,
              start_month: Date.today.month,
          months_duration: 6
        },
        to: "forecasts#index"
  end

  namespace :api, defaults: { format: :json }, contraints: { format: :json } do
    namespace :news do
      resources :items, path: '/'
    end
  end


end
