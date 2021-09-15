require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'


describe DestroyingAResource do

  subject{ described_class.new(user, resource)  }
  let(:user){ build(:no_roles_user) }
  let(:resource){ double(:resource, destroy: _, name: _) }

  include_examples 'a context'

  context 'when authorized' do

    before{ authorization.call }


    context 'with a membership' do
      let(:resource){ Membership.create }
      it 'destroys the membership' do
        expect{ subject.call }
          .to change{ Membership.count }
          .from(1)
          .to(0)
      end
    end


    context 'with a project' do
      let(:resource){ create(:project) }
      it 'destroys the project' do
        expect{ subject.call }
          .to change{ Project.count }
          .from(1)
          .to(0)
      end
      describe 'handling related associations' do
        context 'with memberships' do
          before{ Membership.create(project: resource)  }
          it 'destroys related memberships' do
            expect{ subject.call }
              .to change{ Membership.count }
              .from(1)
              .to(0)
          end
        end
        context 'with taggings' do
          before{ Tagging.create(taggable_id: resource.id, taggable_type: 'Project')  }
          it 'destroys related taggings' do
            expect{ subject.call }
              .to change{ Tagging.count }
              .from(1)
              .to(0)
          end
        end
      end
    end


    context 'with a person' do
      let(:resource){ build(:person) }
      it 'destroys the person' do
        expect( resource ).to receive(:destroy)
        subject.call
      end
      describe 'handling related associations' do
        context 'with memberships' do
          before{ Membership.create(person: resource)  }
          it 'destroys related memberships' do
            expect{ subject.call }
              .to change{ Membership.count }
              .from(1)
              .to(0)
          end
        end
        context 'with taggings' do
          before{ Tagging.create(taggable: resource)  }
          it 'destroys related taggings' do
            expect{ subject.call }
              .to change{ Tagging.count }
              .from(1)
              .to(0)
          end
        end
      end
    end


    context 'with a tagging' do
      let(:resource){ Tagging.create }
      it 'destroys the tagging' do
        expect{ subject.call }
          .to change{ Tagging.count }
          .from(1)
          .to(0)
      end
    end


    context 'with a duration' do
      let(:resource){ Duration.create }
      it 'destroys the duration' do
        expect{ subject.call }
          .to change{ Duration.count }
          .from(1)
          .to(0)
      end
    end


    context 'with a tag' do
      let(:resource){ create(:tag) }
      it 'destroys the tag' do
        expect{ subject.call }
          .to change{ Tag.count }
          .from(1)
          .to(0)
      end
      describe 'handling relations' do
        context 'with taggings' do
          before{ Tagging.create(tag_id: resource.id)  }
          it 'destroys related taggings' do
            expect{ subject.call }
              .to change{ Tagging.count }
              .from(1)
              .to(0)
          end
        end
        context 'with parent tags' do
          before{ Tagging.create(taggable_id: resource.id, taggable_type: 'Tag')  }
          it 'destroys related taggings' do
            expect{ subject.call }
              .to change{ Tagging.count }
              .from(1)
              .to(0)
          end
        end
      end
    end

  end

end
