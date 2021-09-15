require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe TagsPresenter do

  describe 'rendering to html' do
    let(:user){ double 'user' }
    subject{ described_class.new(collection: collection, view_context: view_context, viewer: double) }
    let!(:tag1){ create(:tag, name: 'tag1') }
    let!(:tag2){ create(:tag, name: 'tag2') }
    let(:collection){ [ tag1, tag2 ] }
    let(:view_context){ view }
    it 'presents the tags' do
      expect( fragment(subject.to_html) ).to have_the 'tags-list'
      expect( fragment(subject.to_html) ).to have_content('tag1')
      expect( fragment(subject.to_html) ).to have_content('tag2')
    end
  end

end
