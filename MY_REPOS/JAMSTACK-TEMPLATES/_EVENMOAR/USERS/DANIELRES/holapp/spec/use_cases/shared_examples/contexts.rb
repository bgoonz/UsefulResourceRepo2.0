require_relative 'authorization_requirers'

shared_examples 'a context' do

  let(:user){ build(:no_roles_user) }
  let(:authorization){ ->{ allow( subject ).to receive( :authorized? ){ true } } }

  describe "as a context" do
    include_examples 'an authorization requirer'

    describe 'supporting injected behavior' do
      context 'when authorized' do
        before { authorization.call }
        let(:success_callback){ ->{} }
        let(:failure_callback){ ->{} }
        it 'executes injected callback on success' do
          allow(subject).to receive(:execution){ true }
          expect( success_callback ).to receive :call
          subject.call( success: success_callback )
        end
        it 'executes injected callback on failure' do
          allow(subject).to receive(:execution){ false }
          expect( failure_callback ).to receive :call
          subject.call( failure: failure_callback )
        end
      end
    end

    describe 'generating an activity' do
      context 'when authorized' do
        before { authorization.call }
        it 'generates a new activity when called' do
          expect( Journal ).to receive(:insert)
          subject.call
        end
      end
    end
  end

end


