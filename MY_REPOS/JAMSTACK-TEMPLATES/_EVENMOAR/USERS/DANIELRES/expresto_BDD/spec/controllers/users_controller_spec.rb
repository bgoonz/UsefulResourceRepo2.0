require 'spec_helper'

describe UsersController do

  before (:each) do
    @user = FactoryGirl.create(:user)
    sign_in @user
  end

  describe "GET 'show'" do

    it "should be successful" do
      visit user_path(@user)
      response.should be_success
    end

    it "should find the right user" do
      get :show, :id => @user.id, :locale => :en
      assigns(:user).should == @user
    end

  end

end
