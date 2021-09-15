require_relative 'spec_helper'

describe 'Quick filtering news items', :slow, :news, :js do
  include Capybara::Angular::DSL

  let(:super_user){ create(:super_user) }

  let!(:news_item_not_interesting){ create(:news_item, summary: 'Not interesting') }
  let!(:news_item_interesting) do
    create(:news_item, summary: 'Very interesting')
  end

  context 'as superuser' do

    before do
      AddingTaggings.new(super_user, super_user, 'tag1, tag2', :motivations).call
      AddingTaggings.new(super_user, news_item_interesting, 'tag1, tag2', :themes).call
    end

    before do
      login_as(super_user, scope: :user)
      visit news_items_path
    end

    describe "setting filter to 'all'" do
      it 'displays all the items' do
        expect( page ).to have_content 'Very interesting'
        expect( page ).to have_content 'Not interesting'
      end
    end

    describe "setting filter to 'interesting'" do
      before do
        page.find( the 'filter-interesting' ).click
      end
      it 'displays the interesting items only' do
        expect( page ).to     have_content 'Very interesting'
        expect( page ).not_to have_content 'Not interesting'
      end
    end

  end

end
