require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'

describe ViewingTags do

  subject{ described_class.new(user).view_context(view_context) }
  let(:user){ build(:no_roles_user) }
  let(:view_context){ double('view_context') }

  include_examples 'a context'

  context 'when authorized' do

    before { authorization.call }

    let(:collection){ [tag] }
    let(:tag){ build(:tag) }
    let(:presenter){ double('presenter') }

    before do
      subject.collection = collection
    end

    it 'passes the tags to a presenter' do
      expect( TagsPresenter )
        .to receive(:new).once
        .with( collection: collection, view_context: view_context, viewer: anything )
        .and_return{ presenter }

      expect( presenter )
        .to receive(:to_html).once

      subject.call
    end
  end

end
