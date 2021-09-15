ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec'
require 'rspec/rails'
require File.expand_path(File.dirname(__FILE__) +'/builders/fixjour.rb')

Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}
Dir[File.expand_path(File.join(File.dirname(__FILE__), 'shared_examples', '**', '*.rb'))].each { |f| require f }

RSpec.configure do |config|
  # == Mock Framework
  #
  # If you prefer to use mocha, flexmock or RR, uncomment the appropriate line:
  #
  # config.mock_with :mocha
  # config.mock_with :flexmock
  # config.mock_with :rr
  config.mock_with :rspec

  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, comment the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true
  config.include(Fixjour)
  config.include Devise::TestHelpers, :type => :controller
  config.include ActionDispatch::TestProcess

end
OmniAuth.config.test_mode = true

def set_omniauth_credentials(provider, value)
  # OmniAuth.config.mock_auth[provider] = value
  controller.stub(:env){ {"omniauth.auth" => @twitter_data } }
end

def omniauth_twitter(uid="111")
  {"user_info"=>
          {"name"=>"Parker Twhompson",
           "location"=>"iPhone: 37.774284,-122.276520",
           "urls"=>{"Website"=>"http://parkerthompson.org",
                    "Twitter"=>"http://twitter.com/pt"},
           "nickname"=>"pt",
           "description"=>"I live in San Francisco.",
           "image"=>"http://a3.twimg.com/profile_images/1270199748/pt_normal.jpg"
          },
   "uid"=>uid,
   "credentials"=>{"token"=>"xx",
                   "secret"=>"xx"
   },
   "extra"=>{"user_hash"=>{"name"=>"Parker TW Thompson",
                           "profile_sidebar_border_color"=>"C0DEED",
                           "profile_background_tile"=>false,
                           "profile_sidebar_fill_color"=>"DDEEF6",
                           "created_at"=>"Sun Oct 21 01:50:51 +0000 2007",
                           "location"=>"iPhone: 37.774284,-122.276520",
                           "profile_image_url"=>"http://a3.twimg.com/profile_images/1270199748/pt_normal.jpg",
                           "follow_request_sent"=>false,
                           "profile_link_color"=>"0084B4",
                           "is_translator"=>false,
                           "id_str"=>"9571702",
                           "contributors_enabled"=>false,
                           "url"=>"http://parkerthompson.org",
                           "favourites_count"=>0,
                           "id"=>9571702,
                           "listed_count"=>19,
                           "protected"=>false,
                           "lang"=>"en",
                           "followers_count"=>699,
                           "notifications"=>false,
                           "description"=>"I live in San Francisco..",
                           "statuses_count"=>1265,
                           "friends_count"=>240,
                           "status"=>{"coordinates"=>nil,
                                      "created_at"=>"Sat Mar 19 18:15:16 +0000 2011",
                                      "text"=>"@jpignata xxx.",
                                      "id"=>49172100509990912,
                                   },
                           "profile_background_image_url"=>"http://a3.twimg.com/a/1299876209/images/themes/theme1/bg.png",
                           "screen_name"=>"pt",
                           "show_all_inline_media"=>true,
                           "following"=>false},
             "access_token"=>nil
   },
  "provider"=>"twitter"
  }
end

def omniauth_facebook(uid="222")
  {"user_info"=>
          {"name"=>"Parker FBompson",
           "urls"=>{"Facebook"=>"http://www.facebook.com/m.parker.thompson",
                    "Website"=>nil},
           "nickname"=>"m.parker.thompson",
           "last_name"=>"Thompson",
           "image"=>"http://graph.facebook.com/614285738/picture?type=square",
           "first_name"=>"Parker",
           "email"=>"parkert@example.com"},
   "uid"=>uid,
   "credentials"=>{"token"=>"ffffffffffffff"},
   "extra"=>{
           "user_hash"=>{
                   "name"=>"Parker FB Thompson",
                   "location"=>{
                           "name"=>"San Francisco, California",
                           "id"=>"114952118516947"
                   },
                   "username"=>"m.parker.thompson",
                   "timezone"=>-5,
                   "gender"=>"male",
                   "id"=>"1",
                   "last_name"=>"Thompson",
                   "updated_time"=>"2011-03-19T19:49:54+0000",
                   "verified"=>true,
                   "locale"=>"en_US",
                   "bio"=>"On the web at http://parkerthompson.org.",
                   "hometown"=>{"name"=>"Olympia, Washington",
                                "id"=>"108374975857409"},
                   "link"=>"http://www.facebook.com/m.parker.thompson",
                   "email"=>"parkert@example.com",
                   "education"=>[{"school"=>{"name"=>"Timberline High School",
                                             "id"=>"109394095745350"},
                                  "type"=>"High School",
                                  "year"=>{"name"=>"1917",
                                           "id"=>"131821060195210"}}
                   ],
                   "work"=>[{"start_date"=>"0000-00", "location"=>{"name"=>"San Francisco, California", "id"=>"114952118516947"},
                             "employer"=>{"name"=>"Pivotal Labs, Inc.", "id"=>"107708552595423"}, "end_date"=>"0000-00"}], "first_name"=>"Parker"}},
   "provider"=>"facebook"}
end

