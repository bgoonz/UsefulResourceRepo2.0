class CommentsController < ApplicationController

  load_and_authorize_resource  

  # GET /comments
  # GET /comments.json
  def index

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @comments }
    end
  end

  # GET /comments/1
  # GET /comments/1.json
  def show

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @comment }
    end
  end

  # GET /comments/new
  # GET /comments/new.json
  def new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @comment }
    end
  end

  # GET /comments/1/edit
  def edit
  end

  # POST /comments
  # POST /comments.json
  def create
    @comment.user = current_user
    @comment.commentable = Article.find(params[:comment][:commentable_id]) if params[:comment][:commentable_type] == 'Article'
    
    respond_to do |format|
      if @comment.save
        format.html { redirect_to :back, notice: 'Comment was successfully created.' }
        format.js
        format.json { render json: @comment, status: :created, location: @comment }
      else
        format.html { render action: "new" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /comments/1
  # PUT /comments/1.json
  def update

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to @comment.commentable, notice: 'Comment was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to comments_url }
      format.json { head :ok }
    end
  end
end
