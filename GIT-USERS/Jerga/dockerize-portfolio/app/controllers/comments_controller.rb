class CommentsController < ApplicationController

  def create
    @comment = curret_user.comments.build(comment_params)
  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end
