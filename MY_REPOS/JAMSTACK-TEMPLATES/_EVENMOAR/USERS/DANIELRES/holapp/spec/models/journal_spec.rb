describe Journal do
  describe 'inserting to the journal' do

    context 'when the user is performing a viewing action' do
      let(:journal_event){ { action: :viewed_something } }
      it 'does not create an activity' do
        expect(Activity)
          .not_to receive(:create!)
        described_class.insert( journal_event )
      end
    end

    context 'when the user is performing any other action' do
      let(:journal_event){ {} }
      it 'creates an activity' do
        expect(Activity)
          .to receive(:create!)
          .with(journal_event)
        described_class.insert( journal_event )
      end
    end

  end
end
