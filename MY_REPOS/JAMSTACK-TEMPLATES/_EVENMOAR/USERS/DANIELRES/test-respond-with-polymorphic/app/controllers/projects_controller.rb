class ProjectsController < ApplicationController
  respond_to :html

  def index
    respond_with @projects = Project.all
  end

  def show
    respond_with @project = Project.find(params[:id])
  end

  def create
    @project = Project.new(params[:project])
    flash[:notice] = "Project was created successfully." if @project.save
    respond_with(@project) do |format|
      #format.html{ render :location => projects_url }
      format.js  { render :layout => false }
    end
  end

  def destroy
    project = Project.find(params[:id])
    if project.destroy
      redirect_to :back, :notice => "Project was removed successfully"
    else
      redirect_to :back, :notice => "Coudn't remove Project"
    end
  end

end
