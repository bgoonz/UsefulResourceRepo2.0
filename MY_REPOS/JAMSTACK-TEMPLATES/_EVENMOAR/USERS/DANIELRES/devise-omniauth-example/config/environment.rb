# Load the rails application
DEFAULT_PAPERCLIP_OPTIONS = {}

DEVISE_MAILER_FROM       = "please-change-me@example.com"
LIVE_PERSONS_EMAIL       = 'help@example.com'

FACEBOOK_APP_ID          = "213491825331116"
FACEBOOK_APP_SECRET      = "3bc4798fec78dc85235d543aa96e5f98"
FACEBOOK_APP_PERMISSIONS = "email,offline_access,publish_stream"

DEFAULT_FB_SHARE_IMAGE   = "http://localhost:3000/images/missing.png"
DEFAULT_FB_POST_NAME     = "This Site's Name"

DEFAULT_PAGE_TITLE       = "This Site's Name"
DEFAULT_PAGE_DESCRIPTION = "This Site's Name"

TWITTER_SECRET_KEY       = "L0LJGa5g4TWNUJfK9jmACNt3i2P2ykUw0TVbysQinIg"
TWITTER_CONSUMER_KEY     = "D4sOenvRrSaI1GIGTTEeSQ"

DEFAULT_SHARE_URL        = "http://localhost:3000"


require File.expand_path('../application', __FILE__)

# Initialize the rails application
OmniauthDeviseExample::Application.initialize!