class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :authenticate_user_from_token!

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => exception.message
  end

  def authenticate_user_from_token!
    user_email = request.GET['user']
    token      = request.GET['token']
    return unless user_email && token
    user = User.find_by_email(user_email)
    if user && Devise.secure_compare(user.token, token)
      sign_in user, store: false
    end
  end

end
