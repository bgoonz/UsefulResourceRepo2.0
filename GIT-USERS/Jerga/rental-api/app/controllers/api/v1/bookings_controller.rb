class Api::V1::BookingsController < ApiController
  before_action :get_user_from_token, only: [:index, :create]

  def index
    @bookings = Booking.find_by_user @user
    render json: @bookings, include: [:rental]
  end

  def create
    @booking = Booking.new(booking_params)

    if is_my_rental?
      return
    end

    if @booking.rental.available_between?(booking_params[:start_at],booking_params[:end_at]);

      @booking.user = @user

      if @booking.save!
        render json: @booking, status: :created
      else
        render json: @booking.errors, status: :unprocessable_entity
      end
    else
      render_custom_error_payload(:conflicting_bookings, status: :forbidden)
    end
  end

  private

  def is_my_rental?
    rental_user = Rental.user @booking.rental_id

    if @user === rental_user
      render_custom_error_payload(:same_owner, status: :forbidden)
      return true;
    else
      return false
    end
  end

  def booking_params
    ActiveModelSerializers::Deserialization.jsonapi_parse(params)
  end

end

