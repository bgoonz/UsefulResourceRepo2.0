require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'

describe 'Deleting a person', :slow do
  let!(:person){ create(:person) }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
    end


    describe 'deleting the person', js: true do
      before(:each) do
        visit person_path(person)
      end
      it 'deletes the person' do
        expect( User.count ).to eq 2
        within the 'actions-menu' do
          find( the 'delete-action').click
        end
        visit root_path
        expect( User.count ).to eq 1
      end
    end


  end

end


