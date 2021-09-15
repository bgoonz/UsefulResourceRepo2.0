require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe TagFieldWithTaggingsPresenter do

  describe 'rendering to html' do
    subject{ described_class.new(tag_field: tag_field, taggings: taggings, viewed_from: viewed_from, view_context: view_context) }
    let(:taggings){ [ tagging1, tagging2] }
    let(:tagging1){ mock_model(Tagging, tag: tag1, context: tag_field, taggable: taggable) }
    let(:tagging2){ mock_model(Tagging, tag: tag2, context: tag_field, taggable: taggable) }
    let(:tag1){ mock_model(Tag, name: 'skill1') }
    let(:tag2){ mock_model(Tag, name: 'skill2') }
    let(:taggable){ mock_model(Project) }
    let(:tag_field){ :skills }
    let(:viewed_from){ :taggable }
    let(:view_context){ view }
    it 'presents the taggings' do
      expect( fragment(subject.to_html) ).to have_the 'skills-list'
      expect( fragment(subject.to_html) ).to have_content('skill1')
      expect( fragment(subject.to_html) ).to have_content('skill2')
    end
  end

end
