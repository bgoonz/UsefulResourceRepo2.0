class ViewingProjects

  include IsAnAdvancedCallable
  include SetsAViewContext
  include UsesAPresenter

  attr_writer :collection

  def initialize(user)
    @user       = user
    @collection = Project.accessible_by(Ability.new(@user), :read)
  end

  private

    def authorized?
      Ability.new(@user).can? :read, Project
    end

    def presenter
      ->{ ProjectsPresenter.new(collection: @collection, view_context: @view_context ).to_html }
    end

    def journal_event
      {
        user:    @user,
        action:  :viewed_projects,
        object:  nil,
        details: {},
      }
    end

end

