require 'spec_helper'

describe User do
  before do
    @user = new_user
  end

  describe "#password_required?" do

    context "new users" do
      before do
        @user = User.new
      end
      
      it "requires a password when no user_token present" do
        @user.should be_password_required
      end
      it "should not require password when they have an auth token" do
        @user.apply_omniauth(omniauth_twitter)
        @user.should_not be_password_required
      end
    end

    context "existing users" do
      before do
        @user.save!
        @user = User.find(@user.id)
      end
      it "requires a password when password is present" do
        @user.password = 'mistyped'
        @user.should be_password_required
      end

      it "requires a correct password when password_comfirmation is present" do
        @user.password_confirmation = 'xx'
        @user.should be_password_required
      end

      it "should not require password no password or confirmation is present" do
         @user.reload.should_not be_password_required
      end
    end

  end

  describe "slugs" do
    context "new records" do
      it "should be set on create" do
        @user.slug.should be_nil
        @user.save!
        @user.slug.should_not be_nil
      end

      it "should deal gracefully with colliding slugs" do
        @user.slug = 'p-t'
        @user.save!

        @dup = new_user
        @dup.apply_omniauth(omniauth_twitter)
        @dup.should be_valid
        @dup.slug.should == 'p-t-2'
      end
    end

    context "existing records" do
      before do
        @slug = 'hi'
        @user = new_user(:slug => @slug)
        @user.slug = @slug
        @user.save!
      end

      it "should not automatically generate slug once a slug  set" do
        @user.save!
        @user.reload
        @user.slug.should == @slug
      end

      it "should allow the user to change slug" do
        @user.slug = 'bye'
        @user.save!
        @user.reload
        @user.slug = 'bye'
      end

      it "should not allow duplicate slugs" do
        @dup = create_user
        @dup.slug = @slug
        @dup.should_not be_valid

        @dup.errors[:slug].should_not be_empty
      end

      it "should be invalid with a blank slug" do
        @user = new_user
        @user.slug = ""
        @user.valid?
        @user.errors[:slug].should_not be_empty
      end
    end
  end

  describe "validations" do
    describe "for omniauthed users" do
      it "should be valid with a token" do
        @user = User.new
        @user.apply_omniauth(omniauth_twitter)
        @user.should be_valid
      end
    end

    describe "for new users" do

      describe "for on-site registered users" do
        it "should require password & match confirmation" do
          @user.password = nil
          @user.password_confirmation = nil

          @user.should_not be_valid

          @user.password = "cool"
          @user.password_confirmation = nil

          @user.should_not be_valid

          @user.password = "cool"
          @user.password_confirmation = "hot"

          @user.should_not be_valid
        end

        it "should require email" do
          @user.email = nil
          @user.should_not be_valid
        end
      end
    end
  end

  describe "#apply_omniauth" do
    context "twitter" do
      it "should create provider token and add twitter credentials" do
        @user.user_tokens.should be_empty

        @user.apply_omniauth(omniauth_twitter)

        token = @user.user_tokens.first
        token.secret.should_not be_nil
        token.token.should_not be_nil
      end
    end

    context "facebook" do
      it "should create provider token and add credentials" do
        @user.user_tokens.should be_empty

        @user.apply_omniauth(omniauth_facebook)

        token = @user.user_tokens.first
        token.token.should_not be_nil
      end
    end

    it "should assign photo is image url is present and photo is empty" do
      @user.user_tokens.should be_empty
      @omni = omniauth_facebook
      @omni['user_info']['image'] = nil
      @user.apply_omniauth(@omni)
      @user.photo.should_not be_exists
    end

#todo file fixtues not found. wtf?
#    it "should NOT assign photo and photo is set" do
#      @user = new_user
#      @user.photo = fixture_file_upload('/files/photo.png', 'image/png')
#      @photo = @user.photo
#      @user.user_tokens.should be_empty
#      @omni = omniauth_facebook
#
#      @user.apply_omniauth(@omni)
#      @user.photo.should be_exists
#      @user.photo.should == @user.photo
#    end
#
#    it "should NOT assign photo and photo is empty and no image_url is present"
  end

  describe "#populate_from_twitter" do

    it "should populate the user's name" do
      @user.name = nil

      @user.apply_omniauth(omniauth_twitter)

      @user.name.should_not be_blank
      @user.name.should == omniauth_twitter['user_info']['name']
    end

    context "when name is already set" do
      it "should not override an existing name" do
        @user.name = "Bob"
        @user.apply_omniauth(omniauth_twitter)
        @user.name.should == 'Bob'
      end
    end

  end

  describe "#connected_to?" do
    before do
      @user.apply_omniauth(omniauth_twitter)
    end

    it "returns true when user has been authed to a network" do
      @user.connected_to?(:twitter).should == true
    end

    it "returns false when user has NOT been authed to a network" do
      @user.connected_to?(:facebook).should == false
    end
  end

  describe "#populate_from_facebook" do
    before do
      @user = new_user(:name => nil, :email => nil)
    end

    it "should populate the user's name" do

      @user.apply_omniauth(omniauth_facebook)

      @user.name.should_not be_blank
      @user.name.should == omniauth_facebook['user_info']['name']
    end

    it "should populate the user's email" do
      @user.apply_omniauth(omniauth_facebook)
      @user.email.should_not be_blank
      @user.email.should == omniauth_facebook['user_info']['email']
    end

    context "when name is already set" do
      before do
        #todo fix fixjour not overriding name
        @user = new_user(:name => 'Bob', :email => 'bob@example.com')
        @user.name = 'Bob'
        @user.apply_omniauth(omniauth_facebook)
      end

      it "should not override an existing name" do
        @user.name.should == 'Bob'
      end

      it "should not override an existing email" do
        @user.email.should == 'bob@example.com'
      end
    end

  end

  describe "#fb_post!" do
    before do
      @client = RestClient
      @user.apply_omniauth(omniauth_facebook)
    end

    describe "when facebook credentials are no longer valid" do
      it "should raise"
    end

    describe "when no credentials are present" do
      it "should raise"
    end

    it "should make post" do
      @client.should_receive(:post)
      @user.fb_post!("hi")
    end
  end

  describe "#tweet!" do
    before do
      @client = mock("client")
      @user.apply_omniauth(omniauth_twitter)
      @user.stub(:twitter_client) { @client }
    end

    describe "when twitter credentials are no longer valid" do
      it "should raise"
    end

    describe "when no twitter credentials are present" do
      it "should raise"
    end

    it "should send tweet" do
      @client.should_receive(:update)
      @user.tweet!("hi")
    end

    it "should truncate tweets that are too long" do
      tweet_message = "this is a tweet that is just much much much much much much much much much much much much much much much much too long for its own good."
      tweet_url = "http://foo.com/username"
      truncated = "this is a tweet that is just much much much much much much much much much much much much much much much much too l...http://foo.com/username"

      @client.should_receive(:update).with(truncated)
      @user.tweet!(tweet_message, tweet_url)
    end

    it "should concat message and url" do
      tweet_message = "this is a tweet."
      tweet_url = "http://foo.com/username"
      sent = "this is a tweet. http://foo.com/username"

      @client.should_receive(:update).with(sent)
      @user.tweet!(tweet_message, tweet_url)
    end
  end
end
