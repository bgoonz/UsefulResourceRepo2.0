class ProfilesController < ApplicationController
  access site_admin: :all

  def update
    @profile = Profile.first

    respond_to do |format|
      if @profile.update(profile_params)
        format.html { redirect_to root_path, notice: 'Profile Updated'}
      else
        format.html { redirect_to root_path }
      end
    end
  end

  def edit
    @profile = Profile.first
  end

  private
  def profile_params
    params.require(:profile).permit(:header)
  end
end
