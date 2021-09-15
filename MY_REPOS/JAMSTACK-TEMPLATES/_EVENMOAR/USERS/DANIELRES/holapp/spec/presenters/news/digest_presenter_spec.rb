require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe News::DigestPresenter do

  describe 'rendering to html' do
    subject{ described_class.new(collection: collection, view_context: view_context) }
    let(:news_item1){ build(:news_item, summary: 'news_item1') }
    let(:news_item2){ build(:news_item, summary: 'news_item2') }
    let(:collection){ [ news_item1, news_item2 ] }
    let(:view_context){ view }
    it 'presents the digest' do
      expect( fragment(subject.to_html) ).to have_content('news_item1')
      expect( fragment(subject.to_html) ).to have_content('news_item2')
    end
  end

end
