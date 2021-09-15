require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'factories_spec_helper'
require 'purpose_selector_spec_helper'


describe 'Homepage', :slow do

  context 'when authenticated' do
    let(:user){ create(:super_user) }

    before(:each) do
      login_as(user, scope: :user)
      visit '/'
    end
    it 'displays a people section' do
      expect( page ).to have_the 'people-list'
    end
    it 'displays a projects section' do
      expect( page ).to have_the 'projects-list'
    end
    it 'displays a top skills section' do
      expect( page ).to have_the 'top-skills'
    end
    it 'displays a top motivations section' do
      expect( page ).to have_the 'top-motivations'
    end

  end

end
