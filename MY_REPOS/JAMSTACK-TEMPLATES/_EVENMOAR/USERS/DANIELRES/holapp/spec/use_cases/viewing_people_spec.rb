require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'

describe ViewingPeople do
  subject{ described_class.new(user).view_context(view_context) }
  let(:user){ build(:no_roles_user) }
  let(:view_context){ double('view_context').as_null_object }

  include_examples 'a context'

  context 'when authorized' do

    before { authorization.call }

    let(:collection){ [user, person] }
    let(:person){ build(:person) }
    let(:presenter){ double('presenter') }

    before do
      subject.collection = collection
    end

    context 'with listable people' do

      before do
        user.stub(   :listable? => true )
        person.stub( :listable? => true )
      end

      it 'passes the listable people to a presenter' do
        expect( PeoplePresenter )
          .to receive(:new).once
          .with( {collection: collection, view_context: view_context} )
          .and_return{ presenter }

        expect( presenter )
          .to receive(:to_html).once

        subject.call
      end
    end


    context 'with some listable people' do
      before do
        user.stub(   :listable? => true )
        person.stub( :listable? => false )
      end
      it 'passes only the listable people to a presenter' do
        expect( PeoplePresenter )
          .to receive(:new).once
          .with( {collection: [user], view_context: view_context} )
          .and_return{ presenter }

        expect( presenter )
          .to receive(:to_html).once

        subject.call

      end

    end

  end

end
