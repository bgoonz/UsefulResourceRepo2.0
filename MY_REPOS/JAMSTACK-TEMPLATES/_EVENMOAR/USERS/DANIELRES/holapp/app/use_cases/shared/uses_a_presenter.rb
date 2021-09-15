module UsesAPresenter
  def execution
    return '' unless authorized?
    raise 'view_context missing' unless @view_context
    presenter.call
  end
end
