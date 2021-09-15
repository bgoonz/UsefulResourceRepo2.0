require 'spec_helper'

describe User do
  let( :user         ) { User.new valid_attributes }
  let( :another_user ) { User.new valid_attributes }
  let( :valid_attributes ) {
    {
      name:                  'Jacky',
      email:                 'jacky@tuning.com',
      password:              'nofear',
      password_confirmation: 'nofear',
      role:                  'admin',
    }
  }


  describe '#new' do
    it( 'creates a new instance given valid attributes' ){ user.should be_valid   }
  end


  describe 'validations' do

    it( 'requires email'    ){ user.tap{ |e| e.email     = '' }.should_not be_valid }
    it( 'requires name'     ){ user.tap{ |e| e.name      = '' }.should_not be_valid }
    it( 'requires password' ){ user.tap{ |e| e.password  = '' }.should_not be_valid }
    it( 'requires password_confirmation' ){ user.tap{ |e| e.password_confirmation  = '' }.should_not be_valid }


    describe 'unique values' do
      before(:each){ user.save }

      it( 'has unique email' ){ User.new( valid_attributes ).should have(1).error_on :email }
      it( 'has unique name'  ){ User.new( valid_attributes ).should have(1).error_on :name  }
      it( 'has case-insensitive unique email' ) do
        User.new( valid_attributes ).tap{ |u| u.email.upcase! }.should have(1).error_on :email
      end

    end


    describe 'password' do

      it( 'sets an encrypted password' ){ user.encrypted_password.should_not be_blank }

      it( 'requires password_confirmation to match' )do
        user.tap{ |u| u.password_confirmation = 'invalid' }.should have(1).error_on :password
      end

      it( 'rejects password < 6 characters') do
        user.tap{ |u|
          u.password = u.password_confirmation = 'abcde'
        }.should have(1).error_on :password
      end

      it( 'accepts password > 5 characters') do
        user.tap{ |u|
          u.password = u.password_confirmation = 'abcdef'
        }.should be_valid
      end

    end

  end


  describe 'associations' do

    describe '#translations' do
      let( :translation1 ){ mock_model 'Translation'       }
      let( :translation2 ){ mock_model 'Translation'       }
      let( :translations ){ [ translation1, translation2 ] }

      it 'returns translations by this user' do
        user.translations        << translation1
        user.translations        << translation2
        user.translations.should =~ translations
      end

    end

  end


  describe 'upon save' do

    describe '#email' do
      let( :valid   ){ %w( user@foo.com THE_USER@foo.bar.org first.last@foo.jp ) }
      let( :invalid ){ %w( user@foo,com user_at_foo.org example.user@foo.      ) }
      it( 'accepts valid'   ){   valid.each { |email| user.tap{ |u| u.email = email }.should     be_valid } }
      it( 'rejects invalid' ){ invalid.each { |email| user.tap{ |u| u.email = email }.should_not be_valid } }
    end

  end


end