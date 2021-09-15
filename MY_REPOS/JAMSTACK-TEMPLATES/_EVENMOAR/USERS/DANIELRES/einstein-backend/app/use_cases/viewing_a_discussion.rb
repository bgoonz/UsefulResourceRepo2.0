class ViewingADiscussion

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
      discussion = Discussion.find(id)
      if discussion
        success.call(discussion)
      else
        failure.call()
      end
    end

end
