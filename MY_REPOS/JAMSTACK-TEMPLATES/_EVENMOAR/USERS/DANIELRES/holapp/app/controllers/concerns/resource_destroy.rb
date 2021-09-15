module ResourceDestroy

  extend ActiveSupport::Concern

  def destroy
    DestroyingAResource
      .new(current_user, resource)
      .call(
        success: ->{ respond_to { |format| format.html { redirect_to :back } } },
        failure: ->{ respond_to { |format| format.html { redirect_to :back } } },
      )
  end

end
