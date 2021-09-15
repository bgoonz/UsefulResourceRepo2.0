class SharingsController < ApplicationController

  before_filter :authenticate_user!, :only => [:create, :new]
  
  def index
    @sharings = Sharing.all(:order => "created_at desc")
    @sharing = Sharing.new
  end

  def show
    @sharing = Sharing.find(params[:id])
  end

  def new
    @sharing = Sharing.new
  end

  def create
    @sharing = current_user.sharings.build(params[:sharing])

    if @sharing.save
      if current_user
        current_user.tweet!(@sharing.content) if current_user.connected_to?(:twitter)
        current_user.fb_post!(@sharing.content) if current_user.connected_to?(:facebook)
      end

      redirect_to(:action => "index", :notice => 'Sharing was successfully created.')
    else
      @sharings = Sharing.all(:order => "created_at desc")
      render :action => "new"
    end
  end
end
