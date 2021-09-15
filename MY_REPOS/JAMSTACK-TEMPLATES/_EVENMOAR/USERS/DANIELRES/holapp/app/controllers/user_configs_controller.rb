class UserConfigsController < ApplicationController
  def index
    render locals: {
      panels:
      [
        News::UserConfig.where(user: current_user).first_or_create,
      ]
    }
  end
end
