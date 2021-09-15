require 'spec_helper'
require 'fact'

  # Can't figure how to run this spec in isolation with datamapper...
  # So we have to also require these:
    require 'activity'


describe Fact do

  describe 'new fact' do
    let( :fact ){ Fact.new }
    it( "supports attribute 'id'"          ){ expect( fact ).to respond_to :id }
    it( "supports attribute 'start_time'"  ){ expect( fact ).to respond_to :id }
    it( "supports attribute 'end_time'"    ){ expect( fact ).to respond_to :id }
    it( "supports attribute 'description'" ){ expect( fact ).to respond_to :id }
  end

  describe 'having an activity' do
    let( :activity ){ double.as_null_object    }
    let( :fact     ){ Fact.new                 }
    before( :each  ){ fact.activity = activity }
    it 'has an activity' do
      expect( fact.activity ).to be activity
    end
  end

  describe 'having a duration' do
    let( :fact   ){ Fact.new }
    before(:each ) do
      start_time = Time.new( 2013,1,1,1,0 )
      duration   = 10 * 60 # 10 minutes
      end_time   = start_time + duration
      fact.stub( start_time: start_time, end_time: end_time  )
    end
    it 'returns its duration in minutes' do
      expect( fact.duration ).to eq 10
    end
  end

end