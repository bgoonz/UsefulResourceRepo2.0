require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'

describe 'Deleting a project', :slow do
  let!(:project){ create(:project) }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
    end


    describe 'deleting the project', js: true do
      before(:each) do
        visit project_path(project)
      end
      it 'deletes the project' do
        expect( Project.count ).to eq 1
        within the 'actions-menu' do
          find( the 'delete-action').click
        end
        visit root_path
        expect( Project.count ).to eq 0
      end
    end


  end

end


