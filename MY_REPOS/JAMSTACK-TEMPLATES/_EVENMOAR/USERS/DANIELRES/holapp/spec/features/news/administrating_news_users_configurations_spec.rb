require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'
require 'best_in_place_spec_helper'

describe 'Admin page for news', :slow, :news, :admin, :js do

  context 'for a superuser' do
    let(:user){ create(:super_user) }
    before(:each) do
      login_as(user, scope: :user)
    end

    before(:each) do
      visit news_admin_path
    end

    it 'allows changing news configuration for users' do
      within the 'news-admin' do
        expect( page).to have_content user.name
      end
    end

  end

end
