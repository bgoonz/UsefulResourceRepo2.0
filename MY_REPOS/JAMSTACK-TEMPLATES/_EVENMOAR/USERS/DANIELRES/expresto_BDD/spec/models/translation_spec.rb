require 'spec_helper'

describe Translation do

  let( :translation      ) { Translation.new valid_attributes }
  let( :language         ) { mock_model 'Language'            }
  let( :expression       ) { mock_model 'Expression'          }
  let( :author           ) { mock_model 'User'                }

  let( :valid_attributes ) {
    {
      expression:    expression,
      language:      language,
      body_litteral: 'Litteral translation',
      body_semantic: 'Semantic translation',
      author:        author,
    }
  }


  describe '#new' do
    it( 'creates a new instance given valid attributes' ){ translation.should be_valid   }
  end


  describe 'validations' do
    it 'requires a litteral translation' do
      translation.tap{ |t| t.body_litteral = '' }.should_not be_valid
    end
    it 'requires a semantic translation' do
      translation.tap{ |t| t.body_semantic = '' }.should_not be_valid
    end
  end


  describe 'associations' do

    describe '#expression' do
      it( 'returns its expression' ){ translation.expression.should eq expression }
    end

    describe '#author' do
      it( 'returns its author'     ){ translation.author.should     eq author     }
    end

    describe '#language' do
      it( 'returns its language'   ){ translation.language.should   eq language   }
    end

  end

end
