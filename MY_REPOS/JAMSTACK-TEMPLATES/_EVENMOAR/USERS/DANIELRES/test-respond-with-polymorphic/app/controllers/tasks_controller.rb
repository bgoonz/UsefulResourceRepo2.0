class TasksController < ApplicationController

  respond_to :html

  def show
    respond_with @task = Task.find(params[:id])
  end

  def create
    @task = Task.new(params[:task])
    flash[:notice] = "Task was created successfully." if @task.save
    redirect_to @task.project
  end
end
