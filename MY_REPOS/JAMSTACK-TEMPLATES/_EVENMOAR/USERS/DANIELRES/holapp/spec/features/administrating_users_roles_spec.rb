require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'
require 'best_in_place_spec_helper'

describe 'Admin page for roles', :slow, :admin do

  context 'for a superuser' do
    let (:user){ create(:super_user   ) }
    let!(:john){ create(:no_roles_user) }

    before do
      login_as(user, scope: :user)
      visit roles_admin_path
    end

    it 'allows changing roles for users' do
      expect(john.roles_name).to match_array []
      within the 'roles-admin' do
        within("#edit_user_#{ john.id }") do
          find(:css, "#user_role_ids_1").set(true)
          find("input[type=submit]").click
        end
      end
      expect(john.roles_name).to match_array ['admin']
    end

  end

end
