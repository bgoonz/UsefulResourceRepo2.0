require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'

describe ViewingProjects do
  subject{ described_class.new(user).view_context(view_context) }
  let(:user){ build(:no_roles_user) }
  let(:view_context){ double('view_context') }

  include_examples 'a context'

  context 'when authorized' do

    before { authorization.call }

    let(:collection){ [project1, project2] }
    let(:project1){ build(:project) }
    let(:project2){ build(:project) }
    let(:presenter){ double('presenter') }

    before do
      subject.collection = collection
    end

    it 'passes the projects to a presenter' do
      expect( ProjectsPresenter )
        .to receive(:new).once
        .with( collection: collection, view_context: view_context )
        .and_return{ presenter }

      expect( presenter )
        .to receive(:to_html).once

      subject.call
    end
  end

end
