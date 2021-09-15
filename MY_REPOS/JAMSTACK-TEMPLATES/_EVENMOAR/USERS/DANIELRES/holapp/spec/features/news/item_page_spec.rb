require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'factories_spec_helper'
require 'purpose_selector_spec_helper'

describe 'Item page', :slow, :news do
  let(:news_item){ create(:news_item) }


  context 'for a superuser' do
    let(:user){ create(:super_user) }
    before(:each) do
      login_as(user, scope: :user)
    end

    describe 'presenting the item data' do
      before(:each) do
        news_item.update_attributes(summary: 'Foo', body: 'Bar')
        visit news_item_path(news_item)
      end
      subject{ page }
      it 'presents the summary' do
        expect( page ).to have_content 'Foo'
      end
      it 'presents the body' do
        expect( page ).to have_content 'Bar'
      end

    end

  end

end
