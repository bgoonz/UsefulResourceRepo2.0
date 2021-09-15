class CommentsController < InheritedResources::Base
  load_and_authorize_resource
  actions :create, :destroy

  def create
    @comment.user         = current_user
    @comment.commentable  = Expression.find(params[:expression_id]) if params[:expression_id]
    UserMailer.comment_added_to_commentable_email(@comment).deliver if current_user.role == 'admin'
    create! do |format|
      format.html { redirect_to :back    }
      format.js   { render layout: false }
    end
  end

  def destroy
    destroy! do |format|
      format.html { redirect_to :back    }
      format.js   { render layout: false }
    end
  end

end
