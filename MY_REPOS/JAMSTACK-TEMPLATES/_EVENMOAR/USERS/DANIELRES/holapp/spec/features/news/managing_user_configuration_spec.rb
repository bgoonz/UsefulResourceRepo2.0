require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'
require 'best_in_place_spec_helper'

describe 'Config page', :slow, :news, :js do

  context 'for a superuser' do

    let(:user){ create(:super_user) }
    before(:each) do
      login_as(user, scope: :user)
    end

    describe 'changing own configuration' do
      before do
        visit user_configs_path
      end
      it 'supports choosing to receive the news digest by email' do
        user_config = News::UserConfig.first
        expect( user_config.receive_digest ).to be_true
        within the 'news_user_config-editor' do
          edit_in_place_boolean user_config, :receive_digest
        end
        user_config.reload
        expect( user_config.receive_digest ).to be_false
      end
    end

    describe "accessing other's configurations" do
      before(:each) do
        user_config = News::UserConfig.first_or_create(user: user)
        visit polymorphic_path(user_config)
      end

      it 'gives access to other users configurations' do
        expect( page ).to have_the 'users_configs-editor'
      end
    end

  end

end
