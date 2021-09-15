require 'spec_helper'

describe ApplicationHelper do
  before do
    @user = new_user
    @user.apply_omniauth(omniauth_twitter)
    @user.apply_omniauth(omniauth_facebook)
  end

  describe "#connected_providers_for" do
    it "should return providers for which the user has provider tokens" do
      helper.connected_providers_for(@user).should include(:facebook)
      helper.connected_providers_for(@user).should include(:twitter)
    end

    it "should NOT return providers for which the user does not have provider tokens" do
      helper.connected_providers_for(@user).should_not include(:google)
    end
  end

end