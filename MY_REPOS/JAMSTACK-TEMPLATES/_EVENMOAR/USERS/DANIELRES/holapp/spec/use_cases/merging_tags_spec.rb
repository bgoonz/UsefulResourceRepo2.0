require 'spec_helper'
require 'factories_spec_helper'
require_relative 'shared_examples/contexts'
require_relative 'shared_examples/form_providers'


describe MergingTags do

  context 'given two tags' do
    subject{ described_class.new(user, master_tag, slave_tag)  }
    let(:user){ build(:no_roles_user) }
    let(:master_tag){ create(:tag, name: 'master_tag') }
    let(:slave_tag){ create(:tag, name: 'slave_tag') }

    include_examples 'a context'
    include_examples 'a form provider'

    context 'when authorized' do
      before{ authorization.call }
      let(:desired_attributes) { { master_tag: master_tag, slave_tag: slave_tag } }

      it 'destroys the slave tag' do
        expect(Tag.all).to match_array [ master_tag, slave_tag ]
        subject.call
        expect(Tag.all).to match_array [ master_tag ]
      end


      context "with taggings" do
        before(:each) do
          @slave_tagging = Tagging.create!(tag: slave_tag)
        end
        it "transfers all the taggings to the master tag" do
          expect{ subject.call }
            .to change{ @slave_tagging.reload.tag }
            .from(slave_tag)
            .to(master_tag)
        end
      end

      context "with children" do
        let!(:slave_child_tagging){ Tagging.create!( context: 'tag_parents', taggable: slave_tag  ) }
        it 'transfers all children to the master tag' do
          expect( slave_child_tagging.taggable ).to eq slave_tag
          subject.call
          expect( slave_child_tagging.reload.taggable ).to eq master_tag
        end
      end


      context 'with existing descriptions' do
        before(:each) do
          master_tag.update_attributes(description: 'master_tag description')
          slave_tag.update_attributes(description: 'slave_tag description')
        end
        it 'merges the descriptions' do
          subject.call
          expect( master_tag.description ).to include 'master_tag description'
          expect( master_tag.description ).to include 'slave_tag description'
        end
      end

    end

  end
end
