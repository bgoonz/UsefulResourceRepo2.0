require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'

describe 'Deleting a duration', :slow do
  let!(:duration){ Duration.create(durable_id: membership.id, durable_type: membership.class.name) }
  let!(:person){ create(:person) }
  let!(:project){ create(:project) }
  let!(:membership){ Membership.create }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
    end


    describe 'deleting the duration' do
      before(:each) do
        project.memberships  << membership
        person.memberships   << membership
        visit person_path(person)
      end
      it 'deletes the duration' do
        expect( Duration.count ).to eq 1
        within the 'durations-list' do
          find( the 'delete-action').click
        end
        visit root_path
        expect( Duration.count ).to eq 0
      end
    end


  end

end


