class SessionsController < ApplicationController
  skip_before_action :authenticate_user_from_token!

  def create
    attempt_token_authorization

    @user ||= User.find_for_database_authentication(email: params[:username])
    return invalid_login_attempt unless @user

    if current_user
      render json: @user, serializer: SessionSerializer, root: nil
    elsif @user.valid_password?(params[:password])
      sign_in :user, @user
      render json: @user, serializer: SessionSerializer, root: nil
    else
      invalid_login_attempt
    end

    end

  private

  def attempt_token_authorization
    auth_token = request.headers['Authorization']
    authenticate_with_auth_token(auth_token) if auth_token
    @user = current_user if current_user
  end

  def invalid_login_attempt
    warden.custom_failure!
    render json: {error: t('sessions_controller.invalid_login_attempt')}, status: :unprocessable_entity
  end

end
