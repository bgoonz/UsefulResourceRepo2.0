require_relative 'spec_helper'

describe 'Transforming a news item urls to links ', :slow, :news, :js do
  include Capybara::Angular::DSL

  context 'as superuser' do

    context 'when creating a news item' do
      let(:super_user){ create(:super_user, display_name: 'Spiderman') }

      before(:each) do
        login_as(super_user, scope: :user)
        visit news_items_path
        within the('news_item-editor') do
          fill_in :news_item_summary, with: 'A link to http://wikipedia.org'
          fill_in :news_item_body,    with: 'A link to http://wikipedia.org'
          find('input[type=submit]').click
          wait_until_angular_ready
        end
      end

      it 'records the urls as markdown links'do
        news_item = News::Item.last
        expect( news_item.summary ).to include "[http://wikipedia.org](http://wikipedia.org)"
        expect( news_item.body    ).to include "[Lire la suite](http://wikipedia.org)"
      end

      it 'renders the urls as html links'do
        visit news_items_path
        within the('news_items-list') do
          expect( page.html ).to include '<a href="http://wikipedia.org">http://wikipedia.org</a>'
          expect( page.html ).to include '<a href="http://wikipedia.org">Lire la suite</a>'
        end
      end

    end

  end

end
