class DurationsController < ApplicationController
  before_filter :authenticate_user!

  include ResourceInPlaceUpdate
  include ResourceDestroy


  def show
    person = resource.durable.user
    redirect_to person
  end


  def create
    AddingADuration
      .new(current_user, new_resource)
      .call(
        success: ->{ redirect_to :back, notice: 'Duration added successfully' },
        failure: ->{ redirect_to :back, alert: 'Could not add duration' },
      )
  end


  private

    def resource_params
      params
        .require(:duration)
        .permit(
          :starts_at,
          :ends_at,
          :quantifier,
        )
    end

    def resource
      Duration.find(params[:id])
    end

    def new_resource
      durable_id   = params[:duration][:durable_id]
      durable_type = params[:duration][:durable_type]
      durable_type.constantize.find(durable_id)
    end

end
