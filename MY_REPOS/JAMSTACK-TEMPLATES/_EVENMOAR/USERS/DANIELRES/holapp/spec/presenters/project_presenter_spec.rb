require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe ProjectPresenter do

  describe 'rendering to html' do
    subject{ described_class.new(viewer: viewer, project: project, view_context: view_context) }
    let(:viewer){ create(:super_user) }
    let(:project){ build(:project, name: 'My project', description: 'Project description', starts_at: Date.parse('2014/01/02'), ends_at: Date.parse('2015/01/02') ) }
    let(:view_context){ view }
    it 'presents the project name' do
      expect( fragment subject.to_html ).to have_content('My project')
    end
    it 'presents the project description' do
      expect( fragment subject.to_html ).to have_content('Project description')
    end
    it 'presents the project start time ' do
      expect( fragment subject.to_html ).to have_content('2014')
    end
    it 'presents the project end time ' do
      expect( fragment subject.to_html ).to have_content('2015')
    end
  end

end
