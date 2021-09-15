class SpeakersController < ApplicationController

  before_filter :find_all_speakers
  before_filter :find_page

  def index
    # you can use meta fields from your model instead (e.g. browser_title)
    # by swapping @page for @speaker in the line below:
    present(@page)
  end

  def show
    @speaker = Speaker.find(params[:id])

    # you can use meta fields from your model instead (e.g. browser_title)
    # by swapping @page for @speaker in the line below:
    present(@page)
  end

protected

  def find_all_speakers
    @speakers = Speaker.order('position ASC')
  end

  def find_page
    @page = Page.where(:link_url => "/speakers").first
  end

end
