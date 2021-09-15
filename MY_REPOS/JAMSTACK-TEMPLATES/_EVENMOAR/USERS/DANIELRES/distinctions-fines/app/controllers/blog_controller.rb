class BlogController < ApplicationController


  def index
    @articles = Article.accessible_by(current_ability)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @articles }
    end
  end
  
end
