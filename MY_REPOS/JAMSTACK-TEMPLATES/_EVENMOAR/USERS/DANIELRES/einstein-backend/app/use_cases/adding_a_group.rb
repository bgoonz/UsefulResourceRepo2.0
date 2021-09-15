class AddingAGroup

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

    def execute(params, success: ->{}, failure: ->{})
      group = Group.new(params)
      if group.save
        success.call(group)
      else
        failure.call(group)
      end
    end

end
