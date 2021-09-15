class PagesController < ApplicationController
  before_action :set_page_defaults

  def cv
  end

  def home
    @profile = Profile.first
    @blogs = Blog.last(2)
  end

  def about
    @skills = Skill.all
  end

  def contact
  end

  def tech_news
    @tweets = SocialTool.twitter_search
  end
end
