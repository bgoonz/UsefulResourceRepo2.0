class AddingAPerson < AddingAResource

  def initialize(user, resource = nil)
    @user              = user
    if resource
      @resource          = resource
      @resource.email    = "ChangeMe#{ (rand * 10000).to_i }@changeme.com" if @resource.email.blank?
      @resource.password = "password#{ rand }" if @resource.password.blank?
    end
  end

end

