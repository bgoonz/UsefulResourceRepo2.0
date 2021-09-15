require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe TagPresenter do

  describe 'rendering to html' do

    context 'for a superuser' do
      subject{ described_class.new(viewer: viewer, tag: tag, view_context: view_context) }
      let(:viewer){ create(:super_user) }
      let(:tag){ build(:tag, name: 'skill1') }
      let(:view_context){ view }
      it 'presents the tag' do
        expect( fragment subject.to_html ).to have_content('skill1')
      end

      context 'when people and projects have been tagged' do
        let!(:person){ create(:listable_person) }
        let!(:project){ create(:project) }
        let!(:tag){ create(:tag, name: 'my_tag') }
        let!(:tagging1){ Tagging.create!( tag_id: tag.id, taggable_type: person.class.name, taggable_id: person.id, context: :skills ) }
        let!(:tagging2){ Tagging.create!( tag_id: tag.id, taggable_type: project.class.name, taggable_id: project.id, context: :skills ) }
        let!(:tagging3){ Tagging.create!( tag_id: tag.id, taggable_type: project.class.name, taggable_id: project.id, context: :needs ) }

        it 'presents the list of tagged people' do
          expect( fragment subject.to_html )
            .to have_css( the('people-taggings')  , text: person.name)
        end

        it 'presents the list of tagged projects' do
          expect( fragment subject.to_html )
            .to have_css( the('projects-taggings'), text: project.name)
          expect( fragment subject.to_html )
            .to have_css( the('skills-list'), text: project.name)
          expect( fragment subject.to_html )
            .to have_css( the('needs-list'), text: project.name)
        end

      end

    end
  end

end
