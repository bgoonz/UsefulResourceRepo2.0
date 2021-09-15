require 'spec_helper'

describe Archivable::Controller do

  let(:controller) { FakesController.new }

  subject { controller }

  it { is_expected.to respond_to(:archive) }

  describe '#archive' do

    it 'sets the instance variable' do
      subject.archive
      expect(subject.get_model_instance_variable).to eq(subject.fake)
    end

    context 'when successfully archived' do

      it 'renders the :show action' do
        expect(subject).to receive(:redirect_to).with(action: :show)
        subject.archive
      end
    end

    context 'when unsuccessfully archived' do

      it 'renders the :show action' do
        allow_any_instance_of(Fake).to receive(:save).and_return(false)
        expect(subject).to receive(:render).with(:edit)
        subject.archive
      end
    end
  end
end
