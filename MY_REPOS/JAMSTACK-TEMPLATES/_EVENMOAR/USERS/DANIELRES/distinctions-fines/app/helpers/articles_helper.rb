module ArticlesHelper

  def last_articles(count=5)
    Article.accessible_by(current_ability).limit(count)
  end
  
end
