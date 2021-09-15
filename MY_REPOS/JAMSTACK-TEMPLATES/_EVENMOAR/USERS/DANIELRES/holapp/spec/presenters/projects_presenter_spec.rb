require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe ProjectsPresenter do

  describe 'rendering to html' do
    subject{ described_class.new(collection: collection, view_context: view_context) }
    let(:project1){ build(:project, name: 'project1') }
    let(:project2){ build(:project, name: 'project2') }
    let(:collection){ [ project1, project2 ] }
    let(:view_context){ view }
    it 'presents the projects' do
      expect( fragment(subject.to_html) ).to have_the 'projects-list'
      expect( fragment(subject.to_html) ).to have_content('project1')
      expect( fragment(subject.to_html) ).to have_content('project2')
    end
  end

end
