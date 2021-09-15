  def my_expression
    @my_expression ||= FactoryGirl.build :expression, author: logged_user
  end
