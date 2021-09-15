require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'
require 'best_in_place_spec_helper'

describe 'Editing a membership', :slow do

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }
    let!(:project){ create(:project) }
    let!(:person){ create(:person) }
    let!(:membership){ Membership.create!( user_id: person.id, project_id: project.id ) }

    before(:each) do
      login_as(super_user, scope: :user)
    end

    describe 'updating the membership description from the project side', js: true do
      before(:all) do
        DatabaseCleaner.clean
      end
      before(:each) do
        membership.update(description: 'initial_description')
        visit project_path(project)
        edit_in_place_textarea(membership, :description, 'updated_description')
      end
      it %q[mentions the updated description on the project page] do
        visit project_path(project)
        within the('memberships-list') do
          expect( page ).to have_content "updated_description"
        end
      end
      it %q[mentions the updated description on the person page] do
        visit person_path(person)
        within the('memberships-list') do
          expect( page ).to have_content "updated_description"
        end
      end
    end

    describe 'updating the membership description from the person side', js: true do
      before(:all) do
        DatabaseCleaner.clean
      end
      before(:each) do
        membership.update(description: 'initial_description')
        visit person_path(person)
        edit_in_place_textarea(membership, :description, 'updated_description')
      end
      it %q[mentions the updated description on the project page] do
        visit project_path(project)
        within the('memberships-list') do
          expect( page ).to have_content "updated_description"
        end
      end
      it %q[mentions the updated description on the person page] do
        visit person_path(person)
        within the('memberships-list') do
          expect( page ).to have_content "updated_description"
        end
      end
    end



    describe 'specifying the membership durations', js: true do

      describe 'adding a blank membership duration' do
        before(:each) do
          visit person_path(person)
          within the('memberships-list') do
            find( the('add-duration-action') ).click
          end
        end
        it 'should add a new duration to the membership' do
          visit person_path(person)
          within the('memberships-list') do
            within the('durations-list') do
              expect( page ).to have_css( '.duration', count: 1 )
            end
          end
        end
      end

      describe 'setting the start date for a duration ' do
        before(:each) do
          visit person_path(person)
          within the('memberships-list') do
            find( the('add-duration-action') ).click
            within the('durations-list') do
              duration = Duration.last
              edit_in_place_date(duration, :starts_at, '01/01/2001')
              visit person_path(person)
              edit_in_place_date(duration, :ends_at, '02/02/2002')
            end
          end
        end
        it 'updates the date on the page' do
          visit person_path(person)
          within the('memberships-list') do
            within the('durations-list') do
              expect( page.body ).to have_content '01/01/2001'
              expect( page.body ).to have_content '02/02/2002'
            end
          end
        end
      end

      describe 'updating the occupation value for a duration', js: true, driver: :selenium do
        before(:each) do
          visit person_path(person)
          within the('memberships-list') do
            find( the('add-duration-action') ).click
            within the('durations-list') do
              duration = Duration.last
              edit_in_place_select(duration, :quantifier, '▮▮▮▮▯')
            end
          end
        end
        it 'mentions the updated quantifier on the person page' do
          visit person_path(person)
          within the('memberships-list') do
            within the('durations-list') do
              expect( page ).to have_content '▮▮▮▮▯'
            end
          end
        end
      end

    end

  end

end


