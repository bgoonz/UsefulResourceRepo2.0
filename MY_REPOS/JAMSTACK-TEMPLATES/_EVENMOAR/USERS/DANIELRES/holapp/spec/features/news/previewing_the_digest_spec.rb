require_relative 'spec_helper'

describe 'Quick filtering news items', :slow, :news do
  let(:super_user){ create(:super_user) }

  let!(:news_item_interesting) do
    create(:news_item, summary: 'Very interesting')
  end

  context 'as superuser' do

    before do
      AddingTaggings.new(super_user, super_user           , 'tag1', :motivations).call
      AddingTaggings.new(super_user, news_item_interesting, 'tag1', :themes     ).call
    end

    before do
      login_as(super_user, scope: :user)
      visit news_preview_digest_path
    end

    describe "Previewing the digest email" do
      it 'displays the items' do
        expect( page ).to have_content 'Very interesting'
      end
    end

  end

end
