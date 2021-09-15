module IconsHelper

  def icon(name)
    name = name.to_s.sub('_','-')
    content_tag(:i, '', class: "icon-#{name}") + '&nbsp;'.html_safe
  end

end
