class App < Sinatra::Base
  configure :production, :development do
    enable :logging
  end

  configure do
    Compass.configuration do |config|
      config.project_path = File.dirname __FILE__
      config.sass_dir = File.join "views", "scss"
      config.images_dir = File.join "views", "images"
      config.http_path = "/"
      config.http_images_path = "/images"
      config.http_stylesheets_path = "/stylesheets"
    end

    set :scss, Compass.sass_engine_options
  end

  #get '/' do
  #  stream do |out|
  #    out << "It's gonna be legen -\n"
  #    sleep 0.5
  #    out << " (wait for it) \n"
  #    sleep 1
  #    out << "- dary!\n"
  #  end
  #end

  get "/" do
    haml :index
  end

  get "/stylesheets/*.css" do |path|
    content_type "text/css", charset: "utf-8"
    #response['Expires'] = (Time.now + 60*60*24*356*3).httpdate
    scss :"scss/#{path}"
  end

  not_found do
    redirect('/404.html')
  end

end

