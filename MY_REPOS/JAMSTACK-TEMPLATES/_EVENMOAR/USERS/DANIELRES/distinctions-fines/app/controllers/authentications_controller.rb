class AuthenticationsController < ApplicationController
  # GET /authentications
  # GET /authentications.json
  
    
  def index
  @authentications = current_user.authentications if current_user

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @authentications }
    end
  end

  # GET /authentications/1
  # GET /authentications/1.json
  def show
    @authentication = Authentication.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @authentication }
    end
  end

  # GET /authentications/new
  # GET /authentications/new.json
  def new
    @authentication = Authentication.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @authentication }
    end
  end

  # GET /authentications/1/edit
  def edit
    @authentication = Authentication.find(params[:id])
  end

  # POST /authentications
  # POST /authentications.json

  def create
  
    auth = request.env['omniauth.auth']  
    authentication = Authentication.find_or_create_by_provider_and_uid(auth['provider'], auth['uid'])
    
    if user_signed_in?
      current_user.authentications << authentication

    elsif authentication.user.present?
      sign_in(:user, authentication.user)

    else
      u = User.create(:display_name => auth['user_info']['name'], :email => auth['user_info']['email'], :password => random_pronouncable_password)
      authentication.user = u
      authentication.save
      sign_in(:user, authentication.user)
    end
    
    redirect_to authentications_path
        

  end


  # PUT /authentications/1
  # PUT /authentications/1.json
  def update
    @authentication = Authentication.find(params[:id])

    respond_to do |format|
      if @authentication.update_attributes(params[:authentication])
        format.html { redirect_to @authentication, notice: 'Authentication was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @authentication.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /authentications/1
  # DELETE /authentications/1.json
  def destroy
    @authentication = current_user.authentications.find(params[:id])
    @authentication.destroy
    flash[:notice] = "Successfully destroyed authentication."

    respond_to do |format|
      format.html { redirect_to authentications_url }
      format.json { head :ok }
    end
  end
end
