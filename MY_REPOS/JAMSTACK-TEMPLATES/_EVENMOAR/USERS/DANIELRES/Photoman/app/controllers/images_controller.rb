class ImagesController < ApplicationController
  def show

  end
  def new
    @image ||= Image.new
    @albums = Album.all
  end
  def create
    @image = Image.new(params[:image])
    if @image.save
      redirect_to album_path(@image.album)
    else
      new
      render :new
    end
  end
end
