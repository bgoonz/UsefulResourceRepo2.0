CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider => 'AWS',
    :aws_access_key_id => ENV.fetch('AWS_S3_ACCESS_KEY'),
    :aws_secret_access_key => ENV.fetch('AWS_S3_SECRET_KEY'),
    :region => ENV.fetch('AWS_REGION')
  }
  config.fog_directory = ENV.fetch('AWS_S3_BUCKET')
end

