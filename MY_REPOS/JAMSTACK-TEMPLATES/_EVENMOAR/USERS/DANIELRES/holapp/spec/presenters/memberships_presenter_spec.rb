require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe MembershipsPresenter do

  describe 'rendering to html' do
    subject{ described_class.new(viewer: viewer , source_object: source_object , caption_text: rand, view_context: view_context) }
    let(:viewer){ create(:super_user) }
    let(:view_context){ view }

    describe 'viewing the memberships from a project' do
      let(:source_object){ create(:project) }
      let(:person){ create(:person, display_name: 'Jacky ze Jack') }
      before(:each) do
        Membership.create!( person: person, project: source_object )
      end
      it 'presents the memberships with the people' do
        expect( fragment(subject.to_html) ).to have_the 'memberships-list'
        expect( fragment(subject.to_html) ).to have_content('Jacky')
      end
    end

    describe 'viewing the memberships from a person' do
      let(:source_object){ create(:person) }
      let(:project){ create(:project, name: 'funky project') }
      before(:each) do
        Membership.create!( person: source_object, project: project )
      end
      it 'presents the memberships with the projects' do
        expect( fragment(subject.to_html) ).to have_the 'memberships-list'
        expect( fragment(subject.to_html) ).to have_content('funky project')
      end
    end

  end


end
