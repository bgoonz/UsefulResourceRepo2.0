module ApplicationHelper

  def login_helper style = ''
    if current_user.is_a?(GuestUser)
      (link_to "Register", new_user_registration_path, class: style + ' register-btn') +
      " ".html_safe +
      (link_to "Login", new_user_session_path, class: style + ' login-btn')
    else
      link_to("Logout", destroy_user_session_path, class: style + ' logout-btn', method: :delete)
    end
  end

  def source_helper(styles)
    if session[:source]
      greeting = "Thanks for visiting my web from #{session[:source]}, please feel free to #{link_to 'contact me',
        contact_path} if you like to work together"
      content_tag(:div, greeting.html_safe, class: styles)
    end
  end

  def copyright_generator
    @copyright = JergaViewTool::Renderer.copyright "Filip Jerga", "All rights reserved"
  end

  def nav_items
    [
      {
        url: root_path, title: "Home"
      },
      {
        url: about_me_path, title: "About"
      },
      {
        url: contact_path, title: "Contact"
      },
      {
        url: blogs_path, title: "Blog"
      },
      {
        url: portfolios_path, title: "Portfolios"
      },
      {
        url: cv_path, title: "CV"
      }
    ]
  end

  def nav_helper style, tag_type
    nav_links = ''

    nav_items.each do |link|
      nav_links << "<#{tag_type}><a href='#{link[:url]}' class='#{style} #{active? link[:url]}'> #{link[:title]} </a></#{tag_type}>"
    end

    nav_links.html_safe
  end

  def active? path
    "active" if current_page? path
  end

  def alerts
    alert = (flash[:alert] || flash[:error] || flash[:notice])

    if alert
      alert_generator alert
    end
  end


  def alert_generator message
    js add_gritter(message, title: "Filip Jerga Portfolio", sticky: false, time: 1000)
  end

end
