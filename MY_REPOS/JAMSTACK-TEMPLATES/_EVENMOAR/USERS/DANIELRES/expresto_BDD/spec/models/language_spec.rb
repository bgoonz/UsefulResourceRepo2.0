require 'spec_helper'

describe Language do

  let( :language         ) { Language.new valid_attributes }
  let( :valid_attributes ) {
    {
      code: 'en',
      name: 'English',
    }
  }


  describe '#new' do
    it( 'creates a new instance given valid attributes' ){ language.should be_valid   }
  end

  describe 'validations' do

    it( 'requires a code'  ){ language.tap{ |l| l.code = '' }.should_not be_valid }
    it( 'requires a name'  ){ language.tap{ |l| l.name = '' }.should_not be_valid }

    it( 'has unique code') do
      language.save
      Language.new( valid_attributes ).should have(1).error_on :code
    end

    it( 'has unique name') do
      language.save
      Language.new( valid_attributes ).should have(1).error_on :name
    end

  end


  describe 'associations' do

    describe '#expressions' do
      let( :expression1 ){ mock_model 'Expression'       }
      let( :expression2 ){ mock_model 'Expression'       }
      let( :expressions ){ [ expression1, expression2 ] }
      it 'returns its expressions' do
        language.expressions        << expression1
        language.expressions        << expression2
        language.expressions.should =~ expressions
      end
    end

  end

end