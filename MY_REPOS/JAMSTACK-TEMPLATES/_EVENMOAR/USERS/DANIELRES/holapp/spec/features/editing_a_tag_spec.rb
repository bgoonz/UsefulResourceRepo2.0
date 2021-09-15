require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'
require 'best_in_place_spec_helper'
require_relative 'shared_examples_for_taggables_spec'

describe 'Editing a tag', :slow do
  let!(:tag){ create(:tag) }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
    end

    describe 'updating the tag details', js: true do
      before(:each) do
        tag.update(
          description: 'initial_description',
                 name: 'initial_name',
        )
        visit tag_path(tag)
      end
      it "supports updating 'description' and 'name'on the tag's page" do
        edit_in_place_textarea_with_activator(tag, :description, 'updated_description', 'description_edit_action')
        edit_in_place_text(tag, :name  , 'updated_name')
        visit tag_path(tag)
        expect( page ).to have_content('updated_description')
        expect( page ).to have_content('updated_name')
      end
    end

  end

end


