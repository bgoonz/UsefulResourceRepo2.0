class PeopleController < ApplicationController
  before_filter :authenticate_user!

  include ResourceInPlaceUpdate
  include ResourceDestroy


  def show
    render inline: PersonPresenter
                    .new(viewer: current_user, person: resource, view_context: view_context)
                    .to_html,
                    layout: true
    rescue ActiveRecord::RecordNotFound
      redirect_to root_url
  end


  def create
    AddingAPerson
      .new(current_user, new_resource)
      .call(
        success: ->{ redirect_to :back, notice: %Q[Person "#{new_resource.name}" has been added successfully] },
        failure: ->{ redirect_to :back, alert: render_to_string(partial: 'shared/errors', locals: { object: new_resource }).html_safe },
      )
  end


  private

    def resource_params
      params
        .require(:user)
        .permit(
          :description,
          :email,
          :name,
          :first_name,
          :last_name,
          :display_name,
          :trigram,
          :mobile,
          :cv_url,
        )
    end

    def resource
      User.find(params[:id])
    end

    def new_resource
      User.new(resource_params)
    end


end
