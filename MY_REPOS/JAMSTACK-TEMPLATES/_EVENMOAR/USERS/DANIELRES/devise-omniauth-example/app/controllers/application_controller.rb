class ApplicationController < ActionController::Base
  include RedirectBack
  
  helper_method :resource_class
  protect_from_forgery

  def current_user
    super || NilUser.new
  end

  def user_signed_in?
    !current_user.nil?
  end
end
