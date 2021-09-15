class MembershipsController < ApplicationController
  before_filter :authenticate_user!

  include ResourceInPlaceUpdate
  include ResourceDestroy


  def show
    redirect_to resource.person
  end


  def create
    AddingAResource
      .new(current_user, new_resource)
      .call(
        success: ->{ redirect_to :back, notice: "#{ new_resource.user } has been successfully added as a member of #{ new_resource.project }" },
        failure: ->{ redirect_to :back, alert: render_to_string(partial: 'shared/errors', locals: { object: new_resource }).html_safe },
        )
  end


  private

    def resource_params
      params
        .require(:membership)
        .permit(
          :user_id,
          :project_id,
          :description,
        )
    end

    def resource
      Membership.find(params[:id])
    end

    def new_resource
      person  = User.find params[:membership][:user_id]
      project = Project.find params[:membership][:project_id]
      Membership.new(person: person, project: project)
    end

end
