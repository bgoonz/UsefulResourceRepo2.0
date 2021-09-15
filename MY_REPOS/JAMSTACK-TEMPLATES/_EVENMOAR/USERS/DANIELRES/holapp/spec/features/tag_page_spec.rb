require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'factories_spec_helper'
require 'purpose_selector_spec_helper'

describe 'Tag page', :slow do
  let(:tag){ create(:tag) }


  context 'for a superuser' do
    let(:user){ create(:super_user) }
    before(:each) do
      login_as(user, scope: :user)
    end

    describe 'presenting the tag data' do
      before(:each) do
        tag.update_attributes(name: 'the name', description: 'the description')
        visit tag_path(tag)
      end
      subject{ page }
      it 'presents its name' do
        expect( page ).to have_content 'the name'
      end
      it 'presents its description' do
        expect( page ).to have_content 'the description'
      end

    end

    context 'when people and projects have been tagged' do
      let!(:person){ create(:listable_person) }
      let!(:project){ create(:project) }
      let!(:tag){ create(:tag, name: 'my_tag') }
      let!(:tagging1){ Tagging.create!( tag_id: tag.id, taggable_type: person.class.name, taggable_id: person.id, context: :skills ) }
      let!(:tagging2){ Tagging.create!( tag_id: tag.id, taggable_type: project.class.name, taggable_id: project.id, context: :skills ) }
      let!(:tagging3){ Tagging.create!( tag_id: tag.id, taggable_type: project.class.name, taggable_id: project.id, context: :needs ) }
      before(:each) do
        visit tag_path(tag)
      end
      it 'presents the list of tagged people' do
        within the 'people-taggings' do
          within the 'skills-list' do
            expect( page ).to have_content person.name
          end
        end
      end
      it 'presents the list of tagged projects' do
        within the 'projects-taggings' do
          within the 'skills-list' do
            expect( page ).to have_content project.name
          end
          within the 'needs-list' do
            expect( page ).to have_content project.name
          end
        end
      end
    end

  end

end
