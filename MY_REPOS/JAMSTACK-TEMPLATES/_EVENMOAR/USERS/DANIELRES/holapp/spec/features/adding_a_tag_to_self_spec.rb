require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'
require 'best_in_place_spec_helper'
require_relative 'shared_examples_for_taggables_spec'

describe 'Adding a tag to self', :slow do
  let!(:tag){ create(:tag) }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
    end

    describe 'adding a tag to my skills' do
      before(:each) do
        tag.update(name: 'super_tag')
        visit tag_path(tag)
      end
      it "adds the tag to my page in the skills list" do
        find(the 'add-tag-to-my-skills-action').click
        visit person_path(super_user)
        within the('skills-list') do
          expect( page ).to have_content('super_tag')
        end
      end
    end

  end

end


