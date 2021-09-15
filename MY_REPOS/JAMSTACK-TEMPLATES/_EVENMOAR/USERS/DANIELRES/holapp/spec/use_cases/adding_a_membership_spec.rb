require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'
require_relative 'shared_examples/form_providers'

[
  AddingAMembershipFromPerson,
  AddingAMembershipFromProject,
].each do |variant|

  describe variant do
    subject{ described_class.new(user, Membership.new(person: person, project: project))  }
    let(:user){ build(:no_roles_user) }
    let(:person){ build(:person) }
    let(:project){ build(:project) }

    include_examples 'a context'
    include_examples 'a form provider'

    context 'when authorized' do
      before{ authorization.call }
      it 'works' do
        subject.call
        expect( project.members ).to match_array [person]
      end
    end

  end

end

