require 'spec_helper'

describe Project do

  describe 'attributes' do
    expect_it { to have_attribute('name') }
    expect_it { to have_attribute('description') }
    expect_it { to have_attribute('starts_at') }
    expect_it { to have_attribute('ends_at') }
    expect_it { to have_attribute('starts_at') }
    expect_it { to have_attribute('ends_at') }
  end

  describe 'associations' do
    expect_it { to have_many(:memberships) }
    expect_it { to have_many(:members).through(:memberships) }
  end

  describe 'associations' do
    expect_it { to have_many(:taggings).dependent(:destroy) }
  end

  describe 'validations' do
    expect_it { to validate_presence_of(:name) }
    expect_it { to validate_uniqueness_of(:name).case_insensitive }
  end

  describe 'type' do
    let(:project){ Project.new }
    it 'is nil by default' do
      expect( project.type ).to be_nil
    end
    it "is 'internal' when type value is 1" do
      project[:type] = 1
      expect( project.type.to_s ).to eq 'internal'
    end
    it "is 'external' when type value is 2" do
      project[:type] = 2
      expect( project.type.to_s ).to eq 'external'
    end
  end

end
