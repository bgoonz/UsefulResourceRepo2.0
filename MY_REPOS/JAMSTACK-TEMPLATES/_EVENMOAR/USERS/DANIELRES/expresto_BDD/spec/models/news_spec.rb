require 'spec_helper'

describe News do

  let( :news             ) { News.new valid_attributes }
  let( :valid_attributes ) {
    {
      body_en:      'Body (en)',
      body_fr:      'Body (fr)',
      author_id:    1,
      published_at: Time.now,
    }
  }


  describe '#new' do
    it( 'creates a new instance given valid attributes' ){ news.should be_valid   }
  end


#   it "should require at least a body in French or in English" do
#
#     no_body_news = News.new(@attr.merge(body_en: "", body_fr: ""))
#     no_body_news.should_not be_valid
#
#     en_body_news = News.new(@attr.merge(body_en: "Not empty", body_fr: ""))
#     en_body_news.should be_valid
#
#     fr_body_news = News.new(@attr.merge(body_en: "", body_fr: "Non vide"))
#     fr_body_news.should be_valid
#   end

end