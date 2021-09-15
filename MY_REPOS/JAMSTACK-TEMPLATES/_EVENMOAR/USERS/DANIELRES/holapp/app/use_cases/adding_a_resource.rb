class AddingAResource

  include IsAnAdvancedCallable
  include SetsAViewContext
  include PresentsAForm

  def initialize(user, resource = nil)
    @user     = user
    @resource = resource
  end

  def get_user_input
    present_form
  end

  private

    def authorized?
      Ability.new(@user).can? :create, @resource
    end

    def execution
      @resource.tap(&:save)
    end

    def journal_event
      {
        user:    @user,
        action:  :added,
        object:  @resource,
        details: { object_name: @resource.name, object_type: @resource.class.name },
      }
    end


end
