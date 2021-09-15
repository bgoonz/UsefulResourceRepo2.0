module LayoutHelper

  def body_class
   [controller_name, action_name].join('-')
  end

  def page_title
    'Expresto'
  end

  def pages
    {
      home:        root_path(locale: locale),
      expressions: expressions_path
    }
  end

end