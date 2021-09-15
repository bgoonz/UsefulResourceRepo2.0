require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'

describe ViewingATaggableTaggings, '- viewing taggings from the taggable side' do
  subject{ described_class.new(user, taggable, tag_field).view_context(view_context) }
  let(:user){ build(:no_roles_user) }
  let(:taggable){ build(:person) }
  let(:tag_field){ :skills }
  let(:view_context){ double('view_context') }

  include_examples 'a context'

  context 'when authorized' do

    before { authorization.call }

    let(:taggings){ [tagging1, tagging2] }
    let(:tagging1){ mock_model( 'Tagging', context: :skills ) }
    let(:tagging2){ mock_model( 'Tagging', context: :skills ) }

    let(:presenter){ double('presenter') }

    before do
      subject.collection = taggings
    end

    it 'passes the taggings, tag_field and view_context to a presenter' do
      expect( TagFieldWithTaggingsPresenter )
        .to receive(:new)
        .with( tag_field: :skills, taggings: [tagging1, tagging2], viewed_from: :taggable, view_context: view_context )
        .and_return{ presenter }

      expect( presenter )
        .to receive(:to_html)
      subject.call
    end

  end

end
