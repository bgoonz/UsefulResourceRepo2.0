require_relative 'spec_helper'

describe 'Quick tagging a news item', :slow, :news, :js, driver: :selenium do
  include Capybara::Angular::DSL

  let(:super_user){ create(:super_user) }
  let!(:news_item){ create(:news_item, summary: 'The summary', body: 'The body') }

  context 'as superuser' do
    before(:each) do
      login_as(super_user, scope: :user)
    end

    describe 'adding themes' do
      before(:each) do
        visit news_items_path
        find( the 'edit-action').click
        wait_until_angular_ready
      end
      it 'adds the taggings to the news' do
        within the("themes-adder") do
          fill_in 'tagging[tag_list]', with: 'tag1, tag2,'
          first('[type=submit]').click
        end
        visit news_items_path
        expect( page ).to have_content('tag1')
        expect( page ).to have_content('tag2')
      end
    end

  end

end
