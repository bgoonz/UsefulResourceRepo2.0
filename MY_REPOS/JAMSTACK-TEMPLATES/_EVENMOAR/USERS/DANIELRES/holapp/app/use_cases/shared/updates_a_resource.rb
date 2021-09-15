module UpdatesAResource

  def with(attributes)
    tap{ @attributes = attributes }
  end

  private
    def authorized?
      Ability.new(@user).can? :manage, @resource
    end

    def execution
      @resource.update_attributes(Hash(@attributes))
    end

    def journal_event
      {
        user:       @user,
        action:     :updated,
        object:     @resource,
        details:    @attributes,
      }
    end

end
