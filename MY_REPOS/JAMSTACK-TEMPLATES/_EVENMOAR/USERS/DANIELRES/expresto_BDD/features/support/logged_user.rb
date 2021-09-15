
def logged_user
  @user ||= FactoryGirl.create :user
end
