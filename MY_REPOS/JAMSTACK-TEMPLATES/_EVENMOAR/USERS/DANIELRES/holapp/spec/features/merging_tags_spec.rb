require 'spec_helper'
require 'fast_authentication_spec_helper'
require 'purpose_selector_spec_helper'
require 'factories_spec_helper'
require 'best_in_place_spec_helper'
require_relative 'shared_examples_for_taggables_spec'

describe 'merging tags', :slow do
  let!(:master_tag){ create(:tag, name: 'master_tag', description: 'master_tag description') }
  let!(:slave_tag){ create(:tag, name: 'slave_tag', description: 'slave_tag description') }

  context 'as a superuser' do
    let(:super_user){ create(:super_user) }

    before(:each) do
      login_as(super_user, scope: :user)
      visit tag_path(master_tag)
    end

    it 'it shows the master tag page after the merging' do
      within the('tag_merger') do
        page.select 'slave_tag'
        find('[type=submit]').click
      end
      expect(page).to have_content 'master_tag description'
      expect(page).to have_content 'slave_tag description'
    end

  end

end


