class AddingADuration < AddingAResource

 def initialize(user, durable)
    @user       = user
    @durable    = durable
    @attributes = { durable: @durable }
    @resource   = Duration.new(@attributes)
  end

  def get_user_input
    present_form(durable: @durable)
  end

end
