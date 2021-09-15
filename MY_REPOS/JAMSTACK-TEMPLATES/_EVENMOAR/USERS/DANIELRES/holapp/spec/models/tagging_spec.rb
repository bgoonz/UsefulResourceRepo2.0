require 'spec_helper'

describe Tagging do

  describe 'attributes' do
    expect_it { to have_attribute('tag_id') }
    expect_it { to have_attribute('taggable_id') }
    expect_it { to have_attribute('taggable_type') }
    expect_it { to have_attribute('context') }
    expect_it { to have_attribute('description') }
    expect_it { to have_attribute('quantifier') }
    expect_it { to respond_to('name') }
  end

  describe 'validation' do
    let!(:java){ FactoryGirl.create(:tag, name: 'java') }
    let!(:jee){ FactoryGirl.create(:tag, name: 'jee') }
    before(:each) do
      Tagging.create( { tag: java, taggable: jee, context: 'tag parents' } )
    end
    it 'mark a circular tagging as invalid' do
      tagging = Tagging.new( tag: jee, taggable: java, context: 'tag parents')
      expect(tagging.valid?).to be_false
      expect{tagging.save!}.to raise_exception
    end
    it 'mark a self tagging as invalid' do
      tagging = Tagging.new( tag: java, taggable: java, context: 'tag parents')
      expect(tagging.valid?).to be_false
      expect{tagging.save!}.to raise_exception
    end
  end

end
