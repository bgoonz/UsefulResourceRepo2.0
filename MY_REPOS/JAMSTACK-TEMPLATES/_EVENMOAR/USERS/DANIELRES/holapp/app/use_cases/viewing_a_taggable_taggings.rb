class ViewingATaggableTaggings

  include IsAnAdvancedCallable
  include SetsAViewContext
  include UsesAPresenter

  attr_writer :collection

  def initialize(user, taggable, tag_field)
    @user       = user
    @taggable   = taggable
    @tag_field  = tag_field
  end

  private

    def authorized?
      Ability.new(@user).can? :read, @taggable
    end

    def presenter
      @collection ||= TaggingRepository.by_taggable_and_tag_field(@taggable, @tag_field)
      ->{ TagFieldWithTaggingsPresenter
            .new(
              tag_field:    @tag_field,
              taggings:     @collection,
              viewed_from:  :taggable,
              view_context: @view_context,
            ).to_html
        }
    end

    def journal_event
      {
        user:    @user,
        action:  :viewed_taggable_taggings,
        object:  @taggable,
        details: { },
      }
    end

end
