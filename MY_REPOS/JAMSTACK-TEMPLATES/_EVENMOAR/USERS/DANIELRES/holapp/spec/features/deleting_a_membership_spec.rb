require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'

describe 'Deleting a membership', :slow do
  let!(:person){ create(:person) }
  let!(:project){ create(:project) }
  let!(:membership){ Membership.create(person: person, project: project) }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
    end


    describe 'deleting the membership', js: true do
      before(:each) do
        visit person_path(person)
      end
      it 'deletes the membership' do
        expect( Membership.count ).to eq 1
        within the 'memberships-list' do
          find( the 'delete-action').click
        end
        visit root_path
        expect( Membership.count ).to eq 0
      end
    end


  end

end


