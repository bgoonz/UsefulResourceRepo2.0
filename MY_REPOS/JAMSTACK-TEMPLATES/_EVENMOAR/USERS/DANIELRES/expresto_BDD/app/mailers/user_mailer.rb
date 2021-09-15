class UserMailer < ActionMailer::Base

  default from: '"Expresto" <noreply@expresto.net>'

  def comment_added_to_commentable_email(comment)
    @comment          = comment
    @commenter        = comment.user
    @commentable      = comment.commentable
    @commentable_type = comment.commentable_type
    mail to: comment.commentable.author.email, subject: "New comment by #{comment.user.name}"
  end

end
