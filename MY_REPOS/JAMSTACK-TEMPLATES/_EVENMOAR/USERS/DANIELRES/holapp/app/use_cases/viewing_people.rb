class ViewingPeople

  include IsAnAdvancedCallable
  include SetsAViewContext
  include UsesAPresenter

  attr_writer :collection

  def initialize(user)
    @user       = user
    @collection = User.accessible_by(Ability.new(@user), :read)
  end

  private

    def authorized?
      Ability.new(@user).can? :read, User
    end

    def presenter
      ->{ PeoplePresenter.new(collection: listables(@collection), view_context: @view_context ).to_html }
    end

    def journal_event
      {
        user:    @user,
        action:  :viewed_people,
        object:  nil,
        details: {},
      }
    end

    private

      def listables(collection)
        collection.select(&:listable?)
      end

end
