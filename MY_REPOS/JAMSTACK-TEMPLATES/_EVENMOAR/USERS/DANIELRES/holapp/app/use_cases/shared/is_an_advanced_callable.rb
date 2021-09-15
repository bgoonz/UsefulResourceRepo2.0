module IsAnAdvancedCallable
  def call(success: ->{}, failure: ->{})
    raise ActionForbiddenError unless authorized?
    if result = execution
      Journal.insert(journal_event)
      success.call
      result
    else
      failure.call
    end
  end
end
