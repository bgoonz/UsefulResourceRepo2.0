module ApplicationHelper

  def advanced_format(*args)
    simple_format(*args).gsub(/@(\d+)/) { |s| u=User.find(s[1..-1].to_i); link_to u, u }.html_safe
  end

end
