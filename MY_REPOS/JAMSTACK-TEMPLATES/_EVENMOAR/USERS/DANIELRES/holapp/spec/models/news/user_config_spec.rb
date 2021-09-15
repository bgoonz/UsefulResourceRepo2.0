require 'spec_helper'

describe News::UserConfig, :news do
  describe 'attributes' do
    expect_it { to have_attribute('digest_sent_at') }
    expect_it { to have_attribute('receive_digest') }
  end
  describe 'associations' do
    expect_it { to belong_to(:user).dependent(:destroy) }
  end

  describe 'keeping track of when a user has last received a news digest' do
    let(:recipient){ FactoryGirl.build(:no_roles_user)  }
    it "supports refreshing the digest_sent_at value" do
      config = described_class.new(user: recipient)
      expect( config.digest_sent_at ).to be_nil
    end
  end
end
