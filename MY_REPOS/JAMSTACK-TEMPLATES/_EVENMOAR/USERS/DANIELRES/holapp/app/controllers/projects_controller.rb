class ProjectsController < ApplicationController
  before_filter :authenticate_user!

  include ResourceInPlaceUpdate
  include ResourceDestroy


  def show
    render inline: ProjectPresenter
                    .new(viewer: current_user, project: resource, view_context: view_context)
                    .to_html,
                    layout: true
    rescue ActiveRecord::RecordNotFound
      redirect_to root_url
  end


  def create
    AddingAResource
      .new(current_user, new_resource)
      .call(
        success: ->{ redirect_to :back, notice: %Q[project "#{new_resource.name}" has been added successfully] },
        failure: ->{ redirect_to :back, alert: render_to_string(partial: 'shared/errors', locals: { object: new_resource }).html_safe },
      )
  end


  private

    def resource_params
      params
        .require(:project)
        .permit(
          :name,
          :description,
          :starts_at,
          :ends_at,
        )
    end

    def resource
      Project.find(params[:id])
    end

    def new_resource
      Project.new(resource_params)
    end


end
