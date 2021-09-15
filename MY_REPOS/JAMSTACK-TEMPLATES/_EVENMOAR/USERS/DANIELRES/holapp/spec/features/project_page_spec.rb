require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'factories_spec_helper'

describe 'Project page', :slow do
  let(:project){ create(:project) }
  context 'as a superuser' do
    let(:user){ create(:super_user) }
    before(:each) do
      login_as(user, scope: :user)
    end
    it 'works' do
      visit project_path(project)
    end
  end

end
