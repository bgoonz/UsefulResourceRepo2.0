class TaggingAResource

  include IsAnAdvancedCallable
  include SetsAViewContext
  include PresentsAForm

  def initialize(user, tag, tag_field, resource)
    @user      = user
    @tag       = tag
    @tag_field = tag_field
    @resource  = resource
  end

  def get_user_input(options={})
    present_form(
      resource:  @resource,
      tag:       @tag,
      tag_field: @tag_field,
      text:      options[:text],
    )
  end

  private

    def authorized?
      Ability.new(@user).can? :manage, @resource
    end

    def execution
      tagging = Tagging
                  .where(tag: @tag, taggable: @resource, context: @tag_field )
                  .first_or_initialize
      tagging.save! unless tagging.persisted?
    end

    def journal_event
      {
        user:      @user,
        action:    :tagged,
        object:    @resource,
        details:   { tag_name: @tag.name, tag_field: @tag_field },
      }
    end

end
