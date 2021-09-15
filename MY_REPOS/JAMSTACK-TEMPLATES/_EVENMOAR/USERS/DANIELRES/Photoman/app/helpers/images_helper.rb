module ImagesHelper

def thumb_url( i, dimensions='60x60#' )
  i.imagefile.thumb(dimensions).url
#  Dragonfly[:images].remote_url_for(i.imagefile.uid)
end

def s3connection( key=ENV['S3_KEY'], secret=ENV['S3_SECRET'] )
  RightAws::S3.new( key, secret )
end

def s3bucket( bucket = ENV['S3_BUCKET'] )
  s3connection.bucket(bucket)
end

def dir_subdirs( options = {} )
  options = { :storage_mode=>'S3' }.merge(options)
  if options[:storage_mode] == 'S3'
    prefix = options[:prefix]
    prefix = prefix.to_s + "/" unless prefix.to_s == ""
    s3bucket.common_prefixes(prefix)
  end
end

def dir_contents( options = {} )
  options = { :storage_mode=>'S3' }.merge(options)
  if options[:storage_mode] == 'S3'
    prefix = options[:prefix]
    a = s3bucket.contents(prefix)
    a.shift
    a
  end
end

def dir_images( options = {} )

  images ||=   []
  dir_contents(options).each{  |f|
    if  ( i = Image.new ) &&
        ( i.imagefile = Dragonfly[:images].fetch(f) ) &&
        ( f.include?('.JPG') || f.include?('.jpg')  )
        images  <<  i

#  require 'RMagick'
#        i.imagefile.file do |f|
#          img = Magick::Image.read(f)[0]
#          exif = img.get_exif_by_entry.reduce(Hash.new) {|hash, entry| hash[entry[0]] = entry[1]; hash }
#          xmp               = XMP.parse(exif)
#          #          iptc = {}
#          #          img.each_iptc_dataset do |dataset, datafield|
#          #            iptc[dataset] = datafield
#          #          end
#          #          meta = { :exif => exif, :iptc => iptc }
#          logger.info ">>>>>--------------"
#          logger.info xmp
#          logger.info "<<<<<--------------"
#        end


    end
  }
  images
end

#def s3_files
#  Dragonfly[:images].datastore.storage.directories.get(ENV['S3_BUCKET']).files
#end
#def images(options = {} )
#    options = { :storage_mode=>'S3' }.merge(options)

#    if options[:storage_mode] == 'S3'
##      connection  =   Fog::Storage.new({ :provider => 'AWS', :aws_access_key_id => ENV['S3_KEY'], :aws_secret_access_key => ENV['S3_SECRET'] })
#      images    ||=   []
#      dirs      ||= []
##      dirs      ||=   []
##      s3_files.each{  |f|
##        if ( i = Image.new ) &&
##           ( i.imagefile = Dragonfly[:images].fetch(f.key) ) &&
##           ( f.key.include?('.JPG') || f.key.include?('.jpg')  ) &&
##           ( options[:year].blank? ? true : f.key =~ /^#{options[:year]}\//  )
##           images  <<  i
##        else
##          dirs << i
##        end
##      }
#    elsif storage_mode == 'system'
#      @years = Dir['albums/*/'].map{|s| File.basename(s) }
#      year = params[:year].presence || @years.last
#      image_paths = Dir["albums/#{year}/**/*.JPG"] + Dir["albums/#{year}/**/*.jpg"]
#      images = []
#      image_paths.each{ |path|
#        url               = File.new(path).path.split('/').insert(1, thumb_size).join('/')
#        meta              = {}
#        e                 = EXIFR::JPEG.new(path)
#        xmp               = XMP.parse(e)
#        meta[:model]      = e.model
#        meta[:date_time]  = e.date_time
#        meta[:width]      = e.width
#        meta[:height]     = e.height
#        meta[:tags]       = xmp.dc.subject rescue []
#        meta[:rating]     = xmp.xmp.send('Rating').to_i rescue nil
#        year              = path.split('/')[1]
#        album             = path.split('/')[2]
#        images << {:year => year, :album => album, :path => path, :url => url, :meta => meta}
#      }
#      @images_by_albums = {}
#      @images_by_tags = {}

#      images.each{ |i|
#        @images_by_albums[ i[:album] ]  ||= []
#        @images_by_albums[ i[:album] ]  <<  i

#        i[:meta][:tags].each{ |t|
#          @images_by_tags[ t ]  ||= []
#          @images_by_tags[ t ]  <<  i
#        }

#      }
#      images
#    end
#  end


end
