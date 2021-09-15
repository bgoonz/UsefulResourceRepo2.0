module DefaultPageContent
  extend ActiveSupport::Concern

  included do
    before_action :set_page_defaults
  end

  def set_page_defaults
    @seo_title = "Filip Jerga Portfolio | My portfolio website"
    @seo_keywords = "Filip Jerga, programmer, developer, freelancer, Javascript, React, Angular, Rails, Ruby"
    @seo_description = "Filip Jerga portfolio and blog page"
    @seo_author = "Filip Jerga"
  end
end
