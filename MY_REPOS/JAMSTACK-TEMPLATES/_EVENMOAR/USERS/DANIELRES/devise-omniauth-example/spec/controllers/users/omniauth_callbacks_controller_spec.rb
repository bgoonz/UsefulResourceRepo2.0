require 'spec_helper'

describe Users::OmniauthCallbacksController do

  before do
    request.env["devise.mapping"] = Devise.mappings[:user]
  end

  describe "/auth/:action/callback" do
    describe "when user is logging in with a previously authed account" do
      before do
        @user = create_user(:name => "", :email => 'existing@example.com')
        @twitter_data = omniauth_twitter
        @user.apply_omniauth(@twitter_data)
        @user.save!
        
        set_omniauth_credentials :twitter, @twitter_data
      end


      it "should lookup the correct user" do
        get :twitter
        controller.current_user.should == @user
      end

      it "should not create new provider token" do
        get :twitter
        @user.reload
        @user.user_tokens.size.should == 1
      end

      it "should redirect :back if :location set" do
        session["user_return_to"] = "/?remember_the_alamo"
        get :twitter
        response.should redirect_to("/?remember_the_alamo")
      end

      it "should redirect to / if :back not set" do
        get :twitter
        response.should redirect_to('/')
      end
    end

    describe "when user is already logged in and adding a provider account associated with another user" do
      it "should tell the user to email for help" do
        @other_acct = create_user(:name => "", :email => 'existing@example.com')
        @twitter_data = omniauth_twitter
        @other_acct.apply_omniauth(@twitter_data)
        @other_acct.save!


        @user = create_user(:name => "")
        sign_in :user, @user

        set_omniauth_credentials :twitter, @twitter_data

        get :twitter
        flash[:alert].should_not be_nil
        flash[:alert].should =~ /help/        
      end
    end

    describe "when user is already logged in and adding an additional provider we haven't seen" do
      before do
        @user = create_user(:name => "", :email => 'existing@example.com')
        sign_in :user, @user

        @twitter_data = omniauth_twitter
        set_omniauth_credentials :twitter, @twitter_data
      end

      it "should not create new user" do
        get :twitter
        controller.current_user.should == @user
      end

      it "should add missing user metadata" do
        get :twitter
        controller.current_user.name.should == @twitter_data['user_info']['name']
      end

      it "should redirect :back if :back set" do
        session["user_return_to"] = "/?remember_the_alamo"
        get :twitter
        response.should redirect_to("/?remember_the_alamo")
      end

      it "should redirect to profile if :back not set"
#      do
#        get :twitter
#        response.should redirect_to("/")
#      end
    end


    describe "when user is new and signing up/in" do
      before do
        @twitter_data = omniauth_twitter
        set_omniauth_credentials :twitter, @twitter_data
      end

      it "should create user" do
        get :twitter
        @user = controller.current_user

        @user.should_not be_nil
        @user.should_not be_new_record
      end

      it "should create provider token" do
        get :twitter
        @user = controller.current_user

        @user.user_tokens.twitter.token.should == @twitter_data["credentials"]["token"]
        @user.user_tokens.twitter.secret.should == @twitter_data["credentials"]["secret"]
      end

      it "should redirect :back if :location set" do
        session["user_return_to"] = "/?remember_the_alamo"
        get :twitter
        response.should redirect_to("/?remember_the_alamo")
      end

      it "should redirect to / if :back not set" do
        get :twitter
        response.should redirect_to('/')
      end
    end
  end
end