class Api::V1::AuthenticationController < ApiController
  skip_before_action :authenticate_user!

  def create
    user = User.find_by(email: params[:user][:email])
    if user and user.valid_password? params[:user][:password]
      render json: { token: JsonWebToken.encode({sub: user.id, email: user.email, name: user.name}), email: user.email}
    else
      render_custom_error_payload(:invalid_credentials, status: :forbidden)
    end
  end
end
