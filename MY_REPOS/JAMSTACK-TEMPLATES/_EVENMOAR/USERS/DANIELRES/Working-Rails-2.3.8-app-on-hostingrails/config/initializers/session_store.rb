# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_testapp_session',
  :secret      => '57034be8a1b061b48a26c4aea4c24fde6db24e458efb0ad57d5c1a0ee34fd99d302d2bb3b1387580d4e8b4f3a969393eb647a9babb4f26c1cebd43366987b9bd'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
