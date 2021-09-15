class UpdatingAResource

  include IsAnAdvancedCallable
  include UpdatesAResource

  def initialize(user, resource)
    @user     = user
    @resource = resource
  end

end

