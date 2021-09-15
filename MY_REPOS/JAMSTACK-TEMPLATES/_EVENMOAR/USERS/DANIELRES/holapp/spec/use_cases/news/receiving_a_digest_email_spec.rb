require 'spec_helper'
require 'factories_spec_helper'
require_relative '../shared_examples/contexts'

describe News::ReceivingADigestEmail do
  subject{ described_class.new(user) }
  let(:user){ create(:super_user) }

  include_examples 'a context'


  context 'when authorized' do

    before{ authorization.call }
    let(:news_items){ [ build(:news_item) ] }

    context 'when the recipient has opted in' do
      before{ subject.config.receive_digest = true }
       context 'with news items to send' do
        before{ subject.news_items = news_items }
        it 'triggers the mailing of the digest' do
          expect( subject.email )
            .to receive(:deliver).once
          subject.call
        end
        it 'keeps tracks of the last time the digest was mailed' do
          expect( subject.config.digest_sent_at ).not_to be_kind_of(Time)
          expect( subject.config.digest_sent_at ).to     be_nil
          subject.call
          expect( subject.config.digest_sent_at ).to     be_kind_of(Time)
          expect( subject.config.digest_sent_at ).not_to be_nil
        end
      end
      context 'with news items to send' do
        before{ subject.news_items = news_items }
        it 'triggers the mailing of the digest' do
          expect( subject.email ).to receive(:deliver).once
          subject.call
        end
      end
      context 'with no news items to send' do
        before{ subject.news_items = [] }
        it 'does not trigger the mailing of the digest' do
          expect( subject.email ).not_to receive(:deliver)
          subject.call
        end
      end
    end

    context 'when the recipient refuses digests' do
      before{ subject.config.receive_digest = false }
      context 'with news items to send' do
        before{ subject.news_items = news_items }
        it 'does not trigger the mailing of the digest' do
          expect( subject.email ).not_to receive(:deliver)
          subject.call
        end
      end
    end
  end

  context 'when not authorized' do
    it 'rescues the exception and continues' do
      capture(:stdout){
        expect{ subject.call }.not_to raise_exception
        expect( subject.call ).to include "CANCELED News::ReceivingADigestEmail for user '#{ user.name }': ActionForbiddenError"
      }
    end
  end

end
