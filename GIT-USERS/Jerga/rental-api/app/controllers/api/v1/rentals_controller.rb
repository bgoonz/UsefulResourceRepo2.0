class Api::V1::RentalsController < ApiController
  before_action :set_rental, except: [:index, :create]
  before_action :get_user_from_token, only: [:index, :create]

  def show
    render json: @rental, include: [:user, {bookings: [:start_at, :end_at]}]
  end

  def index
    if params[:filter] && params[:filter][:user]
      @rentals = Rental.find_by_user @user
      render json: @rentals.includes(:bookings), include: ['bookings'], each_serializer: RentalSerializer
    else
      @rentals = Rental.find_by_city(params)
      render json: @rentals.includes(:user), meta: {total_pages: @rentals.total_pages}, include: ['user'], each_serializer: RentalSerializer
    end
  end

  def create
    @rental = Rental.new(convert_data_uri_to_upload(rental_params))
    @rental.user = @user

    if @rental.save
      render json: @rental, status: :created
    else
      render_error_payload @rental.errors
    end
  end

  private

  def set_rental
    @rental = Rental.find(params[:id])
  end

  def rental_params
   ActiveModelSerializers::Deserialization.jsonapi_parse(params)
  end

  def split_base64(uri_str)
    if uri_str.match(%r{^data:(.*?);(.*?),(.*)$})
      uri = Hash.new
      uri[:type] = $1 # "image/gif"
      uri[:encoder] = $2 # "base64"
      uri[:data] = $3 # data string
      uri[:extension] = $1.split('/')[1] # "gif"
      return uri
    else
      return nil
    end
  end

  def convert_data_uri_to_upload(obj_hash)
    if obj_hash[:image].try(:match, %r{^data:(.*?);(.*?),(.*)$})
      image_data = split_base64(obj_hash[:image])
      image_data_string = image_data[:data]
      image_data_binary = Base64.decode64(image_data_string)

      temp_img_file = Tempfile.new("")
      temp_img_file.binmode
      temp_img_file << image_data_binary
      temp_img_file.rewind

      img_params = {:filename => "image.#{image_data[:extension]}", :type => image_data[:type], :tempfile => temp_img_file}
      uploaded_file = ActionDispatch::Http::UploadedFile.new(img_params)

      obj_hash[:image] = uploaded_file
    end

    return obj_hash
  end

end
