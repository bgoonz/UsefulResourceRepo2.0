Expresto::Application.routes.draw do

  root to: "home#redirect_to_locale"


  scope "(:locale)" do

    root to: "home#index"
    match 'about' => 'pages#about', as: :about

    devise_for :users

    resources  :users
    resources  :languages

    resources  :expressions do
      resources :comments
      resources :translations
    end

    resources   :news

  end


end
