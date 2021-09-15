module ButtonsHelper

  def sign_in_button
    link_to icon(:signin)+t(:sign_in), new_user_session_path, data: { purpose: 'sign-in-button' }
  end

  def sign_out_button
    link_to icon(:signout)+t(:sign_out), destroy_user_session_path, method: :delete, data: { purpose: 'sign-in-button' }
  end

end
