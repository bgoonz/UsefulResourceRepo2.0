class ApiController < ApplicationController
  before_action :set_default_format
  before_action :authenticate_user!

  private

  def set_default_format
    request.format = :json
  end

  def get_user_from_token
    token = JsonWebToken.decode auth_token
    @user = User.find_by_id(token["sub"])
  end

  def auth_token
    @auth_token ||= request.headers.fetch('Authorization', "").split(" ").last
  end

  def same_user? user
    user === @user ? true : false
  end

  protected

  def render_custom_error_payload(identifier, status: :bad_request)
    render json: ErrorPayload.new(identifier, status), status: status
  end

  def render_error_payload errors
    render json: ErrorPayload.serialize_errors(errors), status: :forbidden
  end
end
