module CommentsHelper

  def last_comments(count=5)
    comments = []
    Article.accessible_by(current_ability).each{ |a| comments +=  a.comments } #authorizing comments via articles
    comments[0..count-1]
  end
  
end
