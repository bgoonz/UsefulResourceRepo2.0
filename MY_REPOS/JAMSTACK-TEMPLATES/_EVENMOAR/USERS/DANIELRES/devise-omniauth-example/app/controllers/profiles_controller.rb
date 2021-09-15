class ProfilesController < ApplicationController
  def show
    @user = User.find_by_slug(params[:id])

    if @user.nil?
      redirect_to '/'
    end    
  end
end
