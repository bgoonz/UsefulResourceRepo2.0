require 'dragonfly/rails/images'

app = Dragonfly[:images]

app.datastore = Dragonfly::DataStorage::S3DataStore.new

app.datastore.configure do |c|
  c.bucket_name       = ENV['S3_BUCKET']
  c.access_key_id     = ENV['S3_KEY']
  c.secret_access_key = ENV['S3_SECRET']
#  c.region = 'eu-west-1'                        # defaults to 'us-east-1'
#  c.storage_headers = {'some' => 'thing'}       # defaults to {'x-amz-acl' => 'public-read'}
#  c.url_scheme = 'https'                        # defaults to 'http'
end
