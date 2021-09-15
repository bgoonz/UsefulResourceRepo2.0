require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe ActivitiesPresenter do

  describe 'rendering to html' do
    let(:user){ create(:super_user, first_name: 'Machin') }
    let(:view_context){ view }

    describe 'in case of updating' do
      let(:activity  ){ build(:activity, action: 'updated', object: resource, details: attributes) }
      describe 'a person' do
        let(:resource  ){ build(:no_roles_user, display_name: 'Batman') }
        let(:attributes){ {} }
        let(:subject   ){ described_class.new(collection: [ activity ], view_context: view_context) }
        it 'presents the activity' do
          expect(fragment(subject.to_html)).to have_css 'td', text: activity.user.name
          expect(fragment(subject.to_html)).to have_css 'td', text: 'updated'
          expect(fragment(subject.to_html)).to have_css 'td', text: 'user'
          expect(fragment(subject.to_html)).to have_css 'td', text: 'Batman'
        end
      end
      describe 'a duration' do
        let(:resource  ){ Duration.new }
        let(:attributes){ {} }
        let(:subject   ){ described_class.new(collection: [ activity ], view_context: view_context) }
        it 'presents the activity' do
          expect(fragment(subject.to_html)).to have_css 'td', text: activity.user.name
          expect(fragment(subject.to_html)).to have_css 'td', text: 'updated'
          expect(fragment(subject.to_html)).to have_css 'td', text: 'duration'
        end
      end
      describe 'a news item' do
        let(:resource  ){ News::UserConfig.new }
        let(:attributes){ { receive_digest: true } }
        let(:subject   ){ described_class.new(collection: [ activity ], view_context: view_context) }
        it 'presents the activity' do
          expect(fragment(subject.to_html)).to have_css 'td', text: activity.user.name
          expect(fragment(subject.to_html)).to have_css 'td', text: 'updated'
          expect(fragment(subject.to_html)).to have_css 'td', text: 'news: userconfig receive_digest'
          expect(fragment(subject.to_html)).to have_css 'td', text: 'receive_digest'
        end
      end
    end

    describe 'in case of sending news digests' do
      let(:activity  ){ build(:activity, action: 'sent_news_digests', object: resource, details: attributes) }
      let(:resource  ){ nil }
      let(:attributes){ { 'log_output' => 'The log output' } }
      let(:subject   ){ described_class.new(collection: [ activity ], view_context: view_context) }
      it 'presents the activity' do
        expect(fragment(subject.to_html)).to have_css 'td', text: 'sent news digests'
        expect(fragment(subject.to_html)).to have_css 'td', text: 'all users'
        expect(fragment(subject.to_html)).to have_css 'td', text: 'The log output'
      end
    end

  end

end
