require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'

describe UpdatingAResource do

  subject{ described_class.new(user, resource)  }
  let(:user){ build(:no_roles_user) }
  let(:execution){ ->{ subject.with(desired_attributes).call } }

  context 'with a tagging' do
    let(:resource){ Tagging.new( description: 'initial_description' ) }
    let(:desired_attributes) { { description: 'desired_description' } }
    include_examples 'a context'
    context 'when authorized' do
      before { authorization.call }
      it 'supports updating the tagging description' do
        expect{ execution.call }
          .to change{ resource.description }
          .from('initial_description')
          .to('desired_description')
      end
    end
  end

  context 'with a project' do
    let(:resource){ build(:project, name: 'initial_name', description: 'initial_description') }
    let(:desired_attributes) { { name: 'desired_name', description: 'desired_description' } }
    include_examples 'a context'
    context 'when authorized' do
      before { authorization.call }
      it 'supports updating the project name' do
        expect{ execution.call }
          .to change{ resource.name }
          .from('initial_name')
          .to('desired_name')
      end
      it 'supports updating the project description' do
        expect{ execution.call }
          .to change{ resource.description }
          .from('initial_description')
          .to('desired_description')
      end
    end
  end

  context 'with a membership' do
    let(:resource){ Membership.new( description: 'initial_description') }
    let(:desired_attributes) { { description: 'desired_description' } }
    include_examples 'a context'
    context 'when authorized' do
      before { authorization.call }
      it 'supports updating the membership description' do
        expect{ execution.call }
          .to change{ resource.description }
          .from('initial_description')
          .to('desired_description')
      end
    end
  end

  context 'with a duration' do
    let(:resource){ Duration.new }
    let(:desired_attributes) { { starts_at: "2013-06-10", ends_at: "2014-06-11"  } }
    include_examples 'a context'
    context 'when authorized' do
      before{ authorization.call }
      it 'supports updating the duration start time' do
        expect{ execution.call }
          .to change{ resource.starts_at }
          .from( nil )
          .to("2013-06-10")
      end
      it 'supports updating the duration end time' do
        expect{ execution.call }
          .to change{ resource.ends_at }
          .from( nil )
          .to("2014-06-11")
      end
    end
  end

  context 'with a person' do
    let(:resource){ build(:person, first_name: 'initial_firstname', last_name: 'initial_lastname', description: 'initial_description') }
    let(:desired_attributes){ { first_name: 'desired_firstname', last_name: 'desired_lastname', description: 'desired_description' } }
    include_examples 'a context'
    context 'when authorized' do
      before { authorization.call }
      it 'supports updating the person name' do
        expect{ execution.call }
          .to change{ resource.name }
          .from('initial_firstname')
          .to('desired_firstname')
      end
      it 'supports updating the person description' do
        expect{ execution.call }
          .to change{ resource.description }
          .from('initial_description')
          .to('desired_description')
      end
    end
  end

end
