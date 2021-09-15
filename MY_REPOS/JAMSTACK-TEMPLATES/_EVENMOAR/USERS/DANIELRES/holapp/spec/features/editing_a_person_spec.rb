require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'
require 'best_in_place_spec_helper'
require_relative 'shared_examples_for_taggables_spec'

describe 'Editing a person', :slow do
  let!(:person){ create(:person) }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
    end

    describe 'adding the person to a project' do
      let!(:project){ create(:project, name: "Project's name") }
      before(:each) do
        visit person_path(person)
        within 'form.new_membership' do
          page.select(project.name)
          page.find('button[type=submit]').click
        end
      end
      it %q[mentions the project on the person's page] do
        within the('memberships-list') do
          expect( page ).to have_content "Project's name"
        end
      end
    end

    describe 'updating the person details', js: true do
      before(:each) do
        person.update(
          description: 'initial_description',
           first_name: 'initial_first_name',
            last_name: 'initial_last_name',
         display_name: 'initial_display_name',
              trigram: 'initial_trigram',
              mobile:  '000',
        )
        visit person_path(person)
      end
      it "supports updating 'description', 'firstname', 'last name', 'display name' and 'trigram' on the person's page" do
        edit_in_place_textarea_with_activator(person, :description, 'updated_description', 'description_edit_action')
        edit_in_place_text(person, :first_name  , 'updated_first_name')
        edit_in_place_text(person, :last_name   , 'updated_last_name')
        edit_in_place_text(person, :display_name, 'updated_display_name')
        edit_in_place_text(person, :trigram     , 'updated_trigram')
        edit_in_place_text(person, :mobile     , '0032123456')
        edit_in_place_text_with_activator(person, :cv_url, 'http://cv_url', 'cv_url_edit_action')

        visit person_path(person)

        expect( page ).to have_content('updated_description')
        expect( page ).to have_content('updated_first_name')
        expect( page ).to have_content('updated_last_name')
        expect( page ).to have_content('updated_display_name')
        expect( page ).to have_content('updated_trigram')
        expect( page ).to have_content('0032123456')
        expect( page ).to have_content('http://cv_url')
      end
    end

    describe 'tagging' do
      let(:taggable){ person }
      let(:tag_field){ :skills }
      include_examples 'a taggable'
    end

  end

end


