class ViewingAGroup

  def initialize(user)
    @user = user
  end

  def authorized?
    true
  end

  def call(*args)
    raise ActionForbiddenError unless authorized?
    execute(*args)
  end


  private

    def execute(id, success: ->{}, failure: ->{})
      group = Group.find(id)
      if group
        success.call(group)
      else
        failure.call()
      end
    end

end
