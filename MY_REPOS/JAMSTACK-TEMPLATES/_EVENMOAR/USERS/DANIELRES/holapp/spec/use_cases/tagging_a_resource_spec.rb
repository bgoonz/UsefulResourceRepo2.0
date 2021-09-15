require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'
require_relative 'shared_examples/form_providers'

describe TaggingAResource do

  subject{ described_class.new(user, tag, tag_field, resource)  }
  let(:user){ build(:no_roles_user) }
  let(:tag){ mock_model(Tag, name: 'my_tag').as_null_object }
  let(:tag_field){ :skills }
  let(:resource){ mock_model(User).as_null_object }

  include_examples 'a context'
  include_examples 'a form provider'

  context 'when authorized' do

    before{ authorization.call }

    it 'works given a tag' do
      subject.call
      tagging = Tagging.last
      expect( tagging.tag_id        ).to eq tag.id
      expect( tagging.context       ).to eq tag_field.to_s
      expect( tagging.taggable_id   ).to eq resource.id
      expect( tagging.taggable_type ).to eq resource.class.name
    end

  end
end



