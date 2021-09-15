require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'factories_spec_helper'
require 'purpose_selector_spec_helper'


describe 'Viewing tops', :slow do

  context 'when authenticated' do
    let(:user){ create(:super_user) }
    let(:url_with_tops){ '/' }

    before(:each) do
      login_as(user, scope: :user)
    end

    context 'with people having skills at various levels' do
      let(:javamaster){ create(:person, display_name: 'javamaster') }
      let(:javajunior){ create(:person, display_name: 'javajunior') }
      before do
        User.enable_list_all!
      end
      after do
        User.disable_list_all!
      end
      before do
        AddingTaggings.new(user, javamaster, 'java', 'skills').call
        Tagging.last.tap{ |t| t.quantifier = 5; t.save! }
        AddingTaggings.new(user, javajunior, 'java', 'skills').call
        Tagging.last.tap{ |t| t.quantifier = 2; t.save! }
      end
      it 'lists the top skills, whith a list of the skilled people for each one' do
        visit url_with_tops
        within the 'top-skills' do
          expect( page ).to have_content 'javamaster'
          expect( page ).not_to have_content 'javajunior'
        end
      end
    end

  end

end
