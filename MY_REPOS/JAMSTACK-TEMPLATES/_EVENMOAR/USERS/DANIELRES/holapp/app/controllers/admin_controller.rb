class AdminController < ApplicationController
  def index
    render stream: true, locals: {
      panels:
      [
        News::AdminPresenter
          .new(collection: User.all, view_context: view_context),
        Roles::AdminPresenter
          .new(collection: User.all, view_context: view_context),
      ]
    }
  end
end
