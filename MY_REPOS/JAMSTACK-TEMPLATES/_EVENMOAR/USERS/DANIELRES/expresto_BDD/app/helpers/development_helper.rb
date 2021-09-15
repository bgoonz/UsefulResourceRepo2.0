module DevelopmentHelper

  def todo wrapper=:div, attributes={}, &block
    attributes[:class] = attributes[:class].to_s + ' todo'
    content_tag(wrapper, capture(&block), attributes) if ( Rails.env == 'development' )
  end

end