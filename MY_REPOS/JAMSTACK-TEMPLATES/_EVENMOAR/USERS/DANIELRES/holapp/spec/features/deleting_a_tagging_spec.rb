require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'

describe 'Deleting a tagging', :slow do
  let!(:tagging){ Tagging.create(tag_id: tag.id, taggable_id: taggable.id, taggable_type: taggable.class.name, context: tag_field) }
  let!(:taggable){ create(:person) }
  let!(:tag){ create(:tag) }
  let(:tag_field){ 'skills' }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
    end


    describe 'deleting the tagging', js: true do
      before(:each) do
        visit person_path(taggable)
      end
      it 'deletes the tagging' do
        expect( Tagging.count ).to eq 1
        within the 'skills-list' do
          find( the 'delete-action').click
        end
        visit root_path
        expect( Tagging.count ).to eq 0
      end
    end


  end

end


