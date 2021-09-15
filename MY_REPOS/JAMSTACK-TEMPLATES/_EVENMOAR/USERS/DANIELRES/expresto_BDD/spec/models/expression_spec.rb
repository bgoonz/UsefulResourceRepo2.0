# encoding: utf-8
require 'spec_helper'

describe Expression do

  let( :expression       ) { Expression.new valid_attributes }
  let( :language         ) { mock_model 'Language'           }
  let( :author           ) { mock_model 'User'               }

  let( :valid_attributes ) {
    {
      language:          language,
      author:            author,
      body:              'Lorem',
      meaning:           'Meaning',
      source_info:       'Source info',
      created_by_author: true,
    }
  }


  describe '#new' do
    it( 'creates a new instance given valid attributes' ){ expression.should be_valid   }
  end

  describe 'validations' do
    it( 'requires a body'        ){ expression.tap{ |e| e.body        = ''  }.should_not be_valid }
    it( 'requires a meaning'     ){ expression.tap{ |e| e.meaning     = ''  }.should_not be_valid }
    it( 'requires an author_id'  ){ expression.tap{ |e| e.author_id   = nil }.should_not be_valid }
    it( 'requires a language_id' ){ expression.tap{ |e| e.language_id = nil }.should_not be_valid }
  end


  describe 'associations' do

    describe '#author' do
      it( 'returns its author'   ){ expression.author.should   eq author   }
    end

    describe '#language' do
      it( 'returns its language' ){ expression.language.should eq language }
    end

    describe '#translations' do
      let( :translation1 ){ mock_model 'Translation'       }
      let( :translation2 ){ mock_model 'Translation'       }
      let( :translations ){ [ translation1, translation2 ] }

      it( 'returns its translations' ) do
        expression.translations        << translation1
        expression.translations        << translation2
        expression.translations.should =~ translations
      end
    end

  end


  describe 'before_save' do

    describe 'clean_and_format_body' do
      it 'removes extra spaces' do
        expression.body                           = '   Body    to clean.  '
        expression.tap{ |e| e.save }.body.should == 'Body to clean.'
      end
      it 'capitalizes the first letter' do
        expression.body                           = 'être à jeun.'
        expression.tap{ |e| e.save }.body.should == 'Être à jeun.'
      end
      it 'adds a final dot' do
        expression.body                           = 'Lorem'
        expression.tap{ |e| e.save }.body.should == 'Lorem.'
      end
    end

  end

end