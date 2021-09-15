require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'
require_relative 'shared_examples/form_providers'

describe AddingADuration do
  subject{ described_class.new(user, durable ) }
  let(:user){ build(:no_roles_user) }
  let(:durable){ mock_model(Membership, name: _) }

  include_examples 'a context'
  include_examples 'a form provider'

  context 'when authorized' do
    before{ authorization.call }
    it 'works' do
      expect( Duration.count ).to eq 0
      subject.call
      expect( Duration.count ).to eq 1
    end
  end

end
