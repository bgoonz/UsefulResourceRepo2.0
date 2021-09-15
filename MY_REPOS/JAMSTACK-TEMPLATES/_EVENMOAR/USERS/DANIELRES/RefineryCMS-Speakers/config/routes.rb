::Refinery::Application.routes.draw do
  resources :speakers, :only => [:index, :show]

  scope(:path => 'refinery', :as => 'admin', :module => 'admin') do
    resources :speakers, :except => :show do
      collection do
        post :update_positions
      end
    end
  end
end
