require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'
require 'best_in_place_spec_helper'



describe 'Editing a tagging', :slow do

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }
    let!(:project){ create(:project) }
    let!(:tag){ create(:tag) }
    let!(:tagging){ Tagging.create!( taggable_id: project.id, taggable_type: 'Project', tag_id: tag.id, context: 'skills' ) }

    before(:each) do
      login_as(super_user, scope: :user)
    end

    describe 'updating the tagging description from the project side', js: true do
      before(:each) do
        tagging.update(description: 'initial_description')
        visit project_path(project)
        edit_in_place_textarea(tagging, :description, 'updated_description')
      end
      it %q[mentions the updated description on the project page] do
        visit project_path(project)
        within the('skills-list') do
          expect( page ).to have_content "updated_description"
        end
      end
      it %q[mentions the updated description on the tag page] do
        visit tag_path(tag)
        within the('projects-taggings') do
          within the('skills-list') do
            expect( page ).to have_content "updated_description"
          end
        end
      end
    end

    describe 'updating the tagging description from the tag side', js: true do
      before(:each) do
        tagging.update(description: 'initial_description')
        visit tag_path(tag)
        edit_in_place_textarea(tagging, :description, 'updated_description')
      end
      it %q[mentions the updated description on the project page] do
        visit project_path(project)
        within the('skills-list') do
          expect( page ).to have_content "updated_description"
        end
      end
      it %q[mentions the updated description on the tag page] do
        visit tag_path(tag)
        within the('projects-taggings') do
          within the('skills-list') do
            expect( page ).to have_content "updated_description"
          end
        end
      end
    end

    describe 'updating the tagging quantifier from the project side', js: true, driver: :selenium do
      before(:each) do
        tagging.update(quantifier: 0)
        visit project_path(project)
        edit_in_place_select(tagging, :quantifier, '▮▮▮▮▯')
      end
      it %q[mentions the updated quantifier on the tag page] do
        visit tag_path(tag)
        within the('projects-taggings') do
          within the('skills-list') do
            expect( page ).to have_content '▮▮▮▮▯'
          end
        end
      end
      it %q[mentions the updated quantifier on the project page] do
        visit project_path(project)
        within the('skills-list') do
          expect( page ).to have_content '▮▮▮▮▯'
        end
      end
    end

  end

end


