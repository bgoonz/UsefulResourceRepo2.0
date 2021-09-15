class DestroyingAResource

  include IsAnAdvancedCallable

  def initialize(user, resource)
    @user     = user
    @resource = resource
  end

  private

    def authorized?
      Ability.new(@user).can? :destroy, @resource
    end

    def execution
      @resource.destroy
    end

    def journal_event
      {
        user:      @user,
        action:    :deleted,
        object:    nil,
        details:   { object_name: @resource.name, object_type: @resource.class.name },
      }
    end

end

