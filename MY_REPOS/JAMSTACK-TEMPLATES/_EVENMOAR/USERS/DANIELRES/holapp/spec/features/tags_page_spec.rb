require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'factories_spec_helper'
require 'purpose_selector_spec_helper'

describe 'Tags page', :slow do
  let(:tag){ create(:tag) }


  context 'for a superuser' do
    let(:user){ create(:super_user) }
    before(:each) do
      login_as(user, scope: :user)
    end

    describe 'presenting the tags' do
      before(:each) do
        tag.update_attributes(name: 'tag_name')
        visit tags_path
      end
      it 'displays the tags' do
        expect( page ).to have_content 'tag_name'
      end
    end


  end

end
