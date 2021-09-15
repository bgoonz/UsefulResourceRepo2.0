require 'spec_helper'
require 'tag'


describe Tag do

  describe 'new tag' do
    let( :tag ) { Tag.new }
    it( "supports attribute 'id'"   ){ expect( tag ).to respond_to :id   }
    it( "supports attribute 'name'" ){ expect( tag ).to respond_to :name }
  end

end