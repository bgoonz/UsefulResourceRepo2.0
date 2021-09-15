require 'spec_helper'

describe News::Fetcher, :news do

  let(:super_user ){ FactoryGirl.create(:super_user) }
  let(:tagged_user){ FactoryGirl.create(:user      ) }

  describe 'filtering news items to match a user interests' do
    let(:news_item_not_interesting){ FactoryGirl.create(:news_item, summary: 'Not interesting' ) }
    let(:news_item_interesting    ){ FactoryGirl.create(:news_item, summary: 'Very interesting') }
    before do
      AddingTaggings.new(super_user, tagged_user          , 'tag1, tag2', :motivations).call
      AddingTaggings.new(super_user, news_item_interesting, 'tag1, tag2', :themes     ).call
    end
    describe "using with filter 'all'" do
      it 'includes all news items' do
        expect( News::Fetcher.new(tagged_user, 'all').call ).to include news_item_interesting
        expect( News::Fetcher.new(tagged_user, 'all').call ).to include news_item_not_interesting
      end

    end
    describe "using with filter 'interesting'" do
      it 'includes only interesting news items for the given user' do
        expect( News::Fetcher.new(tagged_user, 'interesting').call ).to include news_item_interesting
        expect( News::Fetcher.new(tagged_user, 'interesting').call ).not_to include news_item_not_interesting
      end
    end
  end

  describe 'considering only news published after a certain date' do
    old_date = DateTime.new(2000,1,1, 1,0,0)
    new_date = old_date + 1
    let!(:old_news_item){ FactoryGirl.create(:news_item, summary: 'Old news', created_at: old_date) }
    let!(:new_news_item){ FactoryGirl.create(:news_item, summary: 'New news', created_at: new_date) }
    it "shows only the relevant news"  do
      expect( News::Fetcher.new(tagged_user, 'all', old_date - 1 ).call ).to     include old_news_item
      expect( News::Fetcher.new(tagged_user, 'all', old_date - 1 ).call ).to     include new_news_item
      expect( News::Fetcher.new(tagged_user, 'all', old_date     ).call ).not_to include old_news_item
      expect( News::Fetcher.new(tagged_user, 'all', old_date     ).call ).to     include new_news_item
    end
  end

end
