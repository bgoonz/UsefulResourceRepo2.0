class ActivitiesController < ApplicationController
  before_filter :authenticate_user!

  def index
    collection = Activity
                  .where("action not LIKE ?", "viewed%")
                  .order('created_at DESC')
                  .first(500)


    render layout: true,
             text: ActivitiesPresenter
                    .new(collection: collection, view_context: view_context)
                    .to_html
  end

end
