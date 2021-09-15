require_relative 'spec_helper'

describe 'Quick adding a news item', :slow, :news, :js do
  include Capybara::Angular::DSL
  let(:super_user){ create(:super_user, display_name: 'Spiderman') }

  context 'as superuser' do

    describe 'using the form to add a news item' do
      before(:each) do
        login_as(super_user, scope: :user)
        visit news_items_path
        within the('news_item-editor') do
          fill_in :news_item_summary, with: 'The summary'
          fill_in :news_item_body,    with: 'The body'
          find('input[type=submit]').click
        end
      end
      it 'adds the news item to the list of news items'do
        visit news_items_path
        within the('news_items-list') do
          expect( page ).to have_content 'The summary'
          expect( page ).to have_content 'The body'
        end
      end
      it 'sets the author of the news item'do
        visit news_items_path
        within the('news_items-list') do
          expect( page ).to have_content 'Spiderman'
        end
      end
    end

  end

end
