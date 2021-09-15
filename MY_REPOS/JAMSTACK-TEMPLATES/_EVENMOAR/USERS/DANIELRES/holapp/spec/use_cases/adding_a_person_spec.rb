require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'
require_relative 'shared_examples/form_providers'

describe AddingAPerson do
  subject{ described_class.new(user, added_person ) }
  let(:user){ build(:no_roles_user) }
  let(:added_person){ build( :person, name: 'Alfred Hitchie') }

  include_examples 'a context'
  include_examples 'a form provider'

  context 'when authorized' do
    before{ authorization.call }
    it 'works' do
      subject.call
      expect( User.all ).to include added_person
    end
  end

end
