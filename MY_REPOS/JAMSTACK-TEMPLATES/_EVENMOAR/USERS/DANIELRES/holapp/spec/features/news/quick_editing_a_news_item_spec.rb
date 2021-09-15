require_relative 'spec_helper'

describe 'Quick editing a news item', :slow, :news, :js do
  include Capybara::Angular::DSL

  let(:super_user){ create(:super_user) }
  let!(:news_item){ create(:news_item, summary: 'Initial summary', body: 'Initial body') }

  context 'as superuser' do

    describe 'using the form to edit the news item' do
      before(:each) do
        login_as(super_user, scope: :user)
        visit news_items_path
        within the('news_items-list') do
          find( the 'edit-action').click
        end
        within the 'news_item-editor' do
          within the 'main-fields' do
            fill_in :news_item_summary, with: 'Updated summary'
            fill_in :news_item_body   , with: 'Updated body'
            find('input[type=submit]').click
            wait_until_angular_ready
          end
        end
      end
      it 'updates the news item' do
        news_item.reload
        expect( news_item.summary ).to eq 'Updated summary'
        expect( news_item.body    ).to eq 'Updated body'
      end
    end

  end

end
