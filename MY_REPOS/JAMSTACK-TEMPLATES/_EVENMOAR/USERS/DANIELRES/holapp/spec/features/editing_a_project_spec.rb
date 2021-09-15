require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'
require 'best_in_place_spec_helper'
require_relative 'shared_examples_for_taggables_spec'

describe 'Editing a project', :slow do
  let!(:project){ create(:project) }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
    end

    describe 'adding the project to a person' do
      let!(:person){ create(:person, first_name: 'Dave') }
      before(:each) do
        visit project_path(project)
        within 'form.new_membership' do
          page.select(person.name)
          page.find('button[type=submit]').click
        end
      end
      it %q[mentions the person on the project's page] do
        within the('memberships-list') do
          expect( page ).to have_content 'Dave'
        end
      end
    end

    describe 'updating the project description', js: true do
      before(:each) do
        project.update(description: 'description')
        visit project_path(project)
      end
      it 'updates the description on the project page' do
        edit_in_place_textarea_with_activator(project, :description, 'updated description', 'description_edit_action')
        visit project_path(project)
        expect( page ).to have_content('updated description')
      end
    end

    describe 'updating the project start time', js: true do
      before(:each) do
        project.update(starts_at: '01/01/2011')
        visit project_path(project)
      end
      it 'updates the start time on the project page' do
        expect( page ).to have_content('01/01/2011')
        edit_in_place_date(project, :starts_at, '02/02/2099')
        visit project_path(project)
        expect( page ).to have_content('02/02/2099')
      end
    end

    describe 'updating the project end time', js: true do
      before(:each) do
        project.update(ends_at: '01/01/2011')
        visit project_path(project)
      end
      it 'updates the start time on the project page' do
        expect( page ).to have_content('01/01/2011')
        edit_in_place_date(project, :ends_at, '02/02/2099')
        visit project_path(project)
        expect( page ).to have_content('02/02/2099')
      end
    end

    describe 'tagging' do
      let(:taggable){ project }
      let(:tag_field){ :skills }
      include_examples 'a taggable'
    end

  end

end


