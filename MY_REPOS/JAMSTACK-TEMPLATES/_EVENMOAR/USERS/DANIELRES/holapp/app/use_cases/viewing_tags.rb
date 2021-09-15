class ViewingTags

  include IsAnAdvancedCallable
  include SetsAViewContext
  include UsesAPresenter

  attr_writer :collection

  def initialize(user)
    @user       = user
    @collection = Tag.accessible_by(Ability.new(@user), :read)
  end

  private

    def authorized?
      Ability.new(@user).can? :read, Tag
    end

    def presenter
      ->{ TagsPresenter.new(collection: @collection, view_context: @view_context, viewer: @user).to_html }
    end

    def journal_event
      {
        user:    @user,
        action:  :viewed_tags,
        object:  nil,
        details: {},
      }
    end

end

