# encoding: utf-8
require 'spec_helper'

describe Comment do

  let( :comment          ) { Comment.new valid_attributes                            }
  let( :user             ) { mock_model 'User'                                       }
  let( :commentable      ) { mock_model 'Expression'
                           }
  let( :valid_attributes ) {
    {
      user:        user,
      commentable: commentable,
      body:        'Lorem',
    }
  }


  describe '#new' do
    it( 'creates a new instance given valid attributes' ){ comment.should be_valid }
  end


  describe 'validations' do
    it( 'requires a body'             ){ comment.tap{ |c| c.body             = ''  }.should_not be_valid }
    it( 'requires a commentable_type' ){ comment.tap{ |c| c.commentable_type = ''  }.should_not be_valid }
    it( 'requires a commentable_id'   ){ comment.tap{ |c| c.commentable_id   = nil }.should_not be_valid }
    it( 'requires a user_id'          ){ comment.tap{ |c| c.user_id          = nil }.should_not be_valid }
  end


  describe 'associations' do
    describe '#user' do
      it( 'returns its author'        ){ comment.user.should eq user }
    end
  end


end