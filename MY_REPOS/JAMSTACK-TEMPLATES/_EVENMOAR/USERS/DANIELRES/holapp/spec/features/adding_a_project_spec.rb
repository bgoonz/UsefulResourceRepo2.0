require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'

describe 'Adding a project', :slow do
  let(:super_user){ create(:super_user) }

  context 'as superuser' do

    describe 'using the form to add a project' do
      before(:each) do
        login_as(super_user, scope: :user)
        visit '/'
        within 'form.new_project' do
          page.fill_in :project_name, with: 'My cool project'
          page.find('input[type=submit]').click
        end
      end
      it %q[adds the project to the list of projects] do
        within the('projects-list') do
          expect( page ).to have_content 'My cool project'
        end
      end
    end

  end

end


