require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe PeoplePresenter do

  describe 'rendering to html' do
    subject{ described_class.new(collection: collection, view_context: view_context) }
    let(:person1){ build(:person, first_name: 'person1') }
    let(:person2){ build(:person, first_name: 'person2') }
    let(:collection){ [ person1, person2 ] }
    let(:view_context){ view }
    it 'presents the people' do
      expect( fragment(subject.to_html) ).to have_the 'people-list'
      expect( fragment(subject.to_html) ).to have_content('person1')
      expect( fragment(subject.to_html) ).to have_content('person2')
    end
  end

end
