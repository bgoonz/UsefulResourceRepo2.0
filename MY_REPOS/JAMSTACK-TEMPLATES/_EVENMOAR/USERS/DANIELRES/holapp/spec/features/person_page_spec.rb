require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'factories_spec_helper'
require 'purpose_selector_spec_helper'

describe 'Person page', :slow do
  let(:person){ create(:person) }


  context 'for a superuser' do
    let(:user){ create(:super_user) }
    before(:each) do
      login_as(user, scope: :user)
    end

    describe 'presenting the person data' do
      before(:each) do
        person.update_attributes(first_name: 'Dave', description: 'the description')
        visit person_path(person)
      end
      subject{ page }
      it 'presents the name' do
        expect( page ).to have_content 'Dave'
      end
      it 'presents the description' do
        expect( page ).to have_content 'the description'
      end

    end

    describe 'presenting the skills' do
      before(:each) do
        AddingTaggings.new(user, person, 'skill1, skill2', :skills).call
        visit person_path(person)
      end
      it 'presents the skills list' do
        within the 'skills-list' do
          expect( page ).to have_content 'skill1'
          expect( page ).to have_content 'skill2'
        end
      end
      it 'exposes a way to add skills' do
        expect( page ).to have_the 'skills-adder'
      end
    end

  end

end
