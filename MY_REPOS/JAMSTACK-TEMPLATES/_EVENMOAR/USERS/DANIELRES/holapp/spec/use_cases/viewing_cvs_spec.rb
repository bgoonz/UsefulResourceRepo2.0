require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'

describe ViewingCvs do

  subject{ described_class.new(user, collection).view_context(view_context) }
  let(:user){ build(:no_roles_user) }
  let(:user2){ build(:no_roles_user) }
  let(:collection){ [user, user2] }
  let(:view_context){ double('view_context').as_null_object }

  include_examples 'a context'

  context 'when authorized' do

    before do
      User.enable_list_all!
    end
    after do
      User.disable_list_all!
    end

    before { authorization.call }
    let(:presenter){ double('presenter') }

    it 'passes the tags to a presenter' do
      expect( CvsPresenter )
        .to receive(:new).once
        .with( collection: collection, view_context: view_context )
        .and_return{ presenter }

      expect( presenter )
        .to receive(:to_html).once

      subject.call
    end
  end

end


