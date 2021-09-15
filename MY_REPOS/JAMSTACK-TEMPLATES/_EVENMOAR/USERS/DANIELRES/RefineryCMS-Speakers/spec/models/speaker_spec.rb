require 'spec_helper'

describe Speaker do

  def reset_speaker(options = {})
    @valid_attributes = {
      :id => 1,
      :firstname => "RSpec is great for testing too"
    }

    @speaker.destroy! if @speaker
    @speaker = Speaker.create!(@valid_attributes.update(options))
  end

  before(:each) do
    reset_speaker
  end

  context "validations" do
    
    it "rejects empty firstname" do
      Speaker.new(@valid_attributes.merge(:firstname => "")).should_not be_valid
    end

    it "rejects non unique firstname" do
      # as one gets created before each spec by reset_speaker
      Speaker.new(@valid_attributes).should_not be_valid
    end
    
  end

end