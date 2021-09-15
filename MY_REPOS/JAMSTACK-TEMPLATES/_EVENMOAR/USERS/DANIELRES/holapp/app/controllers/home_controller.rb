class HomeController < ApplicationController
  before_filter :authenticate_user!

  def index
    begin
      render text: GlobalViewPresenter.new(
                            viewer: current_user,
                      view_context: view_context,
                    ).to_html,
                    layout: true
    rescue ActionForbiddenError
      sign_out(current_user)
      redirect_to root_path
    end
  end

end

