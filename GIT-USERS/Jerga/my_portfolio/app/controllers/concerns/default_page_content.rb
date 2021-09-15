module DefaultPageContent
  extend ActiveSupport::Concern

  def set_page_defaults
    @seo_title = "Filip Jerga | Professional web development services"
    @seo_keywords = "web developer, freelancer, web development company, web development services, freelance web developer, freelance work"
    @seo_description = "Professional web development services for small and medium business for affordable prices. Freelance web developer with many years of professional web development experiences. Providing professional web development solutions, consultancy, seo website improvements, website redesign, legacy code refactoring."
    @seo_author = "Filip Jerga"
    @current_task = Task.last
  end

# BLOG
  def set_page_defaults_blog
    @seo_title = "Filip Jerga | Programming tutorials"
    @seo_keywords = "programming, learn programming, web courses, freelancer,freelance work, learn to code"
    @seo_description = "Filip Jerga blog page. Blog page dedicated mainly to programming, web development, software development. Learn how to program with me. Get know more about work as freelancer and freelance life. Traveling experiences from digital nomad life. "
    @seo_author = "Filip Jerga"
  end

# PORTOFLIO
  def set_page_defaults_portfolio
    @seo_title = "Filip Jerga | Freelance portfolio"
    @seo_keywords = "web development portfolio, portfolio, web developer, web developer portfolio, freelance work"
    @seo_description = "Filip Jerga full stack web developer portfolio presentation. Wide range of web applications created with use of different technologies and programming languages. Applications created in angular, react, rails, javascript, html."
    @seo_author = "Filip Jerga"
  end
end
