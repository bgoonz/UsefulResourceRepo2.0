require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'

describe 'Deleting a tag', :slow do
  let!(:tag){ create(:tag) }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
    end


    describe 'deleting the tag', js: true do
      before(:each) do
        visit tag_path(tag)
      end
      it 'deletes the tag' do
        expect( Tag.count ).to eq 1
        within the 'actions-menu' do
          find( the 'delete-action').click
        end
        visit root_path
        expect( Tag.count ).to eq 0
      end
    end


  end

end


