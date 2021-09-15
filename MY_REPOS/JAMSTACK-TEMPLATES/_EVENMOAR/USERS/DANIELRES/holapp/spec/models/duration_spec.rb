require 'spec_helper'

describe Duration do


  describe 'attributes' do
    expect_it { to have_attribute('durable_id') }
    expect_it { to have_attribute('durable_type') }
    expect_it { to have_attribute('starts_at') }
    expect_it { to have_attribute('ends_at') }
    expect_it { to have_attribute('quantifier') }
    expect_it { to respond_to('name') }
  end


  describe 'for a membership' do
    let(:membership){ FactoryGirl.build(:membership) }
    let(:project   ){ membership.project }
    let(:duration  ){ Duration.new(durable: membership) }

    describe 'inheriting values' do
      context "when 'starts_at' or 'ends_at' are not locally defined" do
        it 'inherits the values from project' do
          expect(duration.starts_at).to be_nil
          project.update(starts_at: '2015-02-16')
          expect(duration.starts_at).to eq '2015-02-16'

          expect(duration.ends_at).to be_nil
          project.update(ends_at: '2016-02-16')
          expect(duration.ends_at).to eq '2016-02-16'
        end
      end
      context "when 'starts_at' or 'ends_at' are locally defined" do
        it 'uses local values instead of inherited' do
          project.update        starts_at: '2015-01-01'
          expect(duration.starts_at).to eq '2015-01-01'
          duration.update       starts_at: '2017-01-01'
          expect(duration.starts_at).to eq '2017-01-01'

          project.update          ends_at: '2016-01-01'
          expect(duration.ends_at  ).to eq '2016-01-01'
          duration.update         ends_at: '2018-01-01'
          expect(duration.ends_at  ).to eq '2018-01-01'
        end
      end
    end

  end


end
