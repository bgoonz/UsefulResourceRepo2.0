require 'spec_helper'
require 'activity'

  # Can't figure how to run this spec in isolation with datamapper...
  # So we have to also require these:
    require 'fact'
    require 'category'


describe Activity do

  describe 'new activity' do
    let( :activity ){ Activity.new }
    it( "supports attribute 'id'"             ){ expect( activity ).to respond_to :id             }
    it( "supports attribute 'name'"           ){ expect( activity ).to respond_to :name           }
    it( "supports attribute 'work'"           ){ expect( activity ).to respond_to :work           }
    it( "supports attribute 'activity_order'" ){ expect( activity ).to respond_to :activity_order }
    it( "supports attribute 'deleted'"        ){ expect( activity ).to respond_to :deleted        }
    it( "supports attribute 'category_id'"    ){ expect( activity ).to respond_to :category_id    }
    it( "supports attribute 'search_name'"    ){ expect( activity ).to respond_to :search_name    }
  end

  describe 'having a category' do
    let( :category ){ double.as_null_object        }
    let( :activity ){ Activity.new                 }
    before( :each  ){ activity.category = category }
    it "supports having a category" do
      activity.category.should == category
    end
  end

  describe 'having facts' do
    let( :fact1               ){ double(:fact1).as_null_object                      }
    let( :fact2               ){ double(:fact2).as_null_object                      }
    let( :activity_with_facts ){ Activity.new.tap{ |a| a.facts = [ fact1, fact2 ] } }
    it "supports having many facts" do
      expect( activity_with_facts.facts ).to match_array [ fact1, fact2 ]
    end
  end

  describe 'displaying months' do
    let( :activity ){ Activity.new }
    let( :month1 ){ DateTime.new( 2012, 1 ) }
    let( :month2 ){ DateTime.new( 2013, 1 ) }
    let( :month3 ){ DateTime.new( 2013, 2 ) }
    let( :fact1  ){ double( start_time: month1 ).as_null_object }
    let( :fact2  ){ double( start_time: month2 ).as_null_object }
    let( :fact3  ){ double( start_time: month2 ).as_null_object }
    let( :fact4  ){ double( start_time: month3 ).as_null_object }
    let( :activity_with_facts ) do
      activity.facts = [ fact1, fact2, fact3, fact4 ]
      activity
    end
    it 'lists months when the activity took place' do
      expect( activity_with_facts.months ).to match_array [ month1, month2, month3 ]
    end
  end
end