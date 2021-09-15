class API < Grape::API
  prefix 'api'
  version 'v1', using: :path
  format :json

  before do
    error!("401 Unauthorized", 401) unless authenticated
  end

  helpers do
    def warden
      env['warden']
    end

    def authenticated
      return true if warden.authenticated?
      headers["Authorization"] && @user = User.find_by_authentication_token(headers["Authorization"])
    end

    def current_user
      warden.user || @user
    end
  end


  mount V1::Groups
end
