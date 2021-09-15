require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe TagTaggingsPresenter do

  describe 'rendering to html' do
    subject{ described_class.new(collection: collection, view_context: view_context) }
    let(:collection){ [ tagging1, tagging2] }
    let(:tagging1){ mock_model(Tagging, taggable_type: 'Project', context: 'skills', tag: tag1, taggable: taggable) }
    let(:tagging2){ mock_model(Tagging, taggable_type: 'Project', context: 'skills', tag: tag2, taggable: taggable) }
    let(:tag1){ mock_model(Tag) }
    let(:tag2){ mock_model(Tag) }
    let(:taggable){ mock_model(Project) }
   it 'presents the tag field with taggings for each taggable type' do
      expect( TagFieldWithTaggingsPresenter )
        .to receive(:new)
        .with(
             tag_field: 'skills',
              taggings: [tagging1, tagging2],
           viewed_from: :tag,
          view_context: view_context,
        ).and_return( double.as_null_object )
      subject.to_html
    end
  end

end
