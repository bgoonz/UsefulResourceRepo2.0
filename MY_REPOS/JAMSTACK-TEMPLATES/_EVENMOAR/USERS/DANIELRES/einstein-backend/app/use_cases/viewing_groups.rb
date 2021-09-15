class ViewingGroups

  def initialize(user)
    @user = user
  end

  def authorized?
    true
  end

  def call
    raise ActionForbiddenError unless authorized?
    execute
  end


  private

    def execute
      Group.all
    end

end
