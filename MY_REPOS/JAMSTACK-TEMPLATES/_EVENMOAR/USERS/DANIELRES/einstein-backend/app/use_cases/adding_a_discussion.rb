class AddingADiscussion

  def initialize(user, discutable: nil)
    @user = user
    @discutable = discutable
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
      discussion = Discussion.new(params)
      discussion.author = @user
      discussion.discutable = @discutable
      if discussion.save
        success.call(discussion)
      else
        failure.call(discussion)
      end
    end

end
