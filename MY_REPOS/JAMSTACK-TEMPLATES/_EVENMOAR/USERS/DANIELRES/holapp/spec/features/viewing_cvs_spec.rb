require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'factories_spec_helper'
require 'purpose_selector_spec_helper'


describe 'Viewing CVs', :slow do

  context 'when authenticated' do
    let(:user){ create(:super_user) }

    before do
      login_as(user, scope: :user)
    end

    before do
      User.enable_list_all!
    end
    after do
      User.disable_list_all!
    end

    context 'with people having a cv url' do
      let!(:person_with_cv1  ){ create(:person, display_name: 'person_with_cv1', cv_url: 'http://www.cv_url1') }
      let!(:person_with_cv2  ){ create(:person, display_name: 'person_with_cv2', cv_url: 'http://www.cv_url2') }
      let!(:person_without_cv){ create(:person, display_name: 'person_without_cv') }
      it 'lists the people and displays the cv links' do
        visit cvs_path
        within the 'cvs-list' do
          expect( page ).to have_content 'person_with_cv1'
          expect( page ).to have_content 'person_with_cv2'
          expect( page ).to have_content 'person_without_cv'
          expect( page ).to have_content 'www.cv_url1'
          expect( page ).to have_content 'www.cv_url2'
        end
      end
    end

  end

end
