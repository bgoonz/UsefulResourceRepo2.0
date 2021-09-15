require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'
require_relative 'shared_examples/form_providers'

describe AddingAProject do
  subject{ described_class.new(user, Project.new(name: 'My project') ) }
  let(:user){ build(:no_roles_user) }

  include_examples 'a context'
  include_examples 'a form provider'

  context 'when authorized' do
    before{ authorization.call }
    it 'works' do
      subject.call
      expect( Project.last.name ).to eq 'My project'
    end
  end

end

