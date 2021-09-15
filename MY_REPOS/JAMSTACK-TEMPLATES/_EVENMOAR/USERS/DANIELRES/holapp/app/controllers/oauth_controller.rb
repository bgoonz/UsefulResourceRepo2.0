class OauthController < Devise::OmniauthCallbacksController

 def google
      @user = User.find_for_google_oauth2(request.env["omniauth.auth"], current_user)

      if @user.persisted?
        flash[:notice] = I18n.t "devise.omniauth_callbacks.success", kind: "Google"
        update_user_image_url(@user, request.env["omniauth.auth"].info.image )
        sign_in_and_redirect @user, event: :authentication
      else
        session["devise.google_data"] = request.env["omniauth.auth"]
        redirect_to new_user_registration_url
      end
  end

  private

    def update_user_image_url(user, url)
      @user.update_attributes(image_url: url)
    end


end
