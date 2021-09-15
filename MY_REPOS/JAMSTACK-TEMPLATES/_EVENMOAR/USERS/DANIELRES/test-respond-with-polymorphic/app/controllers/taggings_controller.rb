class TaggingsController < ApplicationController
  respond_to :html, :json

  def create
    params[:tagging][:tag][:name].split(",").each do |n|
      @tag = Tag.find_or_create_by_name(n)
      @taggable = class_eval(params[:tagging][:taggable_type]).find(params[:tagging][:taggable_id])
      begin
        @taggable.tags << @tag
        flash[:notice] = "Tagging was created successfully (#{@tag.name})."
      rescue
        flash[:error]  = "Could not create this tag association (#{@tag.name}), maybe it was already existing ?"
      end
    end
    redirect_to :back
  end

  def destroy
    tagging = Tagging.find(params[:id])
    flash[:notice] = "Tagging was removed successfully." if tagging.destroy
    redirect_to :back
  end

  def index
    @taggings = Tag.where("name like ?", "%#{params[:q]}%")
      respond_with(@taggings)
  end

end
