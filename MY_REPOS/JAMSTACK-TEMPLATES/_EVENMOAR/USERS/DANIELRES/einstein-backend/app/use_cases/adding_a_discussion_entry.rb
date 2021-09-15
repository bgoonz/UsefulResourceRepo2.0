class AddingADiscussionEntry

  def initialize(user, discussion: nil)
    @user = user
    @discussion = discussion
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
      entry = DiscussionEntry.new(body: params[:body])
      entry.author = @user
      entry.discussion = @discussion
      if entry.save
        success.call(entry)
      else
        failure.call(entry)
      end
    end

end
