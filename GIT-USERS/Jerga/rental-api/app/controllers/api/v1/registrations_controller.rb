class Api::V1::RegistrationsController < Devise::RegistrationsController

  def create
    @user = User.new(sign_up_params)
    if @user.save
      render json: @user, status: :created
      return;
    else
      render_error_payload @user.errors
      return;
    end
  end

  private

  def sign_up_params
    ActiveModelSerializers::Deserialization.jsonapi_parse(params)
  end

  def render_error_payload errors
    render json: ErrorPayload.serialize_errors(errors), status: :forbidden
  end
end
