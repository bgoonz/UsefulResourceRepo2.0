class TranslationsController < ApplicationController
  load_and_authorize_resource

  respond_to :html, :js

  def create
    @translation.author     = current_user
    @translation.expression = Expression.find(params[:expression_id])
    respond_with(@translation.tap(&:save), :location => @translation.expression, :layout => !request.xhr?)
  end

  def destroy
    if @translation.destroy
      #flash[:notice] = :destroy_success
    end
    respond_with(@translation, :location => @translation.expression, :layout => !request.xhr?)
  end

end
