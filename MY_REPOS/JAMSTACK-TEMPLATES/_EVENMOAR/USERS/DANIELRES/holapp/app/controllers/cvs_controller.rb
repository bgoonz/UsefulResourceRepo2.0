class CvsController < ApplicationController
  before_filter :authenticate_user!

  def index
    people = User.all
    render layout: true,
             text: ViewingCvs
                    .new(current_user, people)
                    .view_context(view_context)
                    .call
  end

end


