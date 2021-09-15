require 'spec_helper'
require 'category'

  # Can't figure how to run this spec in isolation with datamapper...
  # So we have to also require these:
    require 'activity'


describe Category do

  describe 'new category' do
    let( :category ) { Category.new }
    it( "supports attribute 'id'"             ){ expect( category ).to respond_to :id             }
    it( "supports attribute 'name'"           ){ expect( category ).to respond_to :name           }
    it( "supports attribute 'color_code'"     ){ expect( category ).to respond_to :color_code     }
    it( "supports attribute 'category_order'" ){ expect( category ).to respond_to :category_order }
    it( "supports attribute 'search_name'"    ){ expect( category ).to respond_to :search_name    }
  end

  describe 'having activities' do
    let( :category ) { Category.new }
    let( :activity1  ){ double.as_null_object }
    let( :activity2  ){ double.as_null_object }
    let( :activities ){ [ activity1, activity2 ] }
    let( :category_with_activities ) do
      category.activities = activities
      category
    end
    it 'supports having activities' do
      expect( category_with_activities.activities ).to match_array activities
    end
  end

end