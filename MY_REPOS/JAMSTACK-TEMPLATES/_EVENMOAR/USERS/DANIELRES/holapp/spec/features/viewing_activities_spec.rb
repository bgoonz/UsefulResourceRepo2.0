require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'factories_spec_helper'
require 'purpose_selector_spec_helper'


describe 'Viewing activities', :slow do

  context 'when authenticated' do
    let(:user){ create(:super_user, display_name: 'user_name') }

    before(:each) do
      login_as(user, scope: :user)
    end

    context 'when someone has updated a resource' do
      context 'with a project' do
        let(:project){ build(:project, name: 'project_name', description: 'initial_description') }
        before do
          UpdatingAResource
            .new(user, project)
            .with(description: 'desired_description')
            .call
          visit activities_path
        end
        it 'shows the activity on the activities page' do
          within the('activities-list') do
            expect( page ).to have_content 'user_name'
            expect( page ).to have_content 'updated'
            expect( page ).to have_content 'project_name'
          end
        end
      end
    end

  end

end
