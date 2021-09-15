module ResourceInPlaceUpdate

  extend ActiveSupport::Concern

  def update
    UpdatingAResource
      .new(current_user, resource)
      .with(resource_params)
      .call(
        success: ->{ respond_to { |format| format.json { respond_with_bip(resource) } } },
        failure: ->{ respond_to { |format| format.json { respond_with_bip(resource) } } },
      )
  end

end
