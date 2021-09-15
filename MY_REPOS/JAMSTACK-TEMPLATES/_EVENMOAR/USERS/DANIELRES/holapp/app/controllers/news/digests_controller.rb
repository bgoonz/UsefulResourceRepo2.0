module News
  class DigestsController < ApplicationController

    before_filter :authenticate_user!

    def preview
      user = User.find(params[:user_id]) rescue current_user
      render  text: News::ReceivingADigestEmail
                    .new(user, dry_run: true)
                    .email
                    .body.to_s.html_safe,
              layout: true
    end

    def dry_run_send_digests
      send_digests
    end

    def send_digests
      render locals: { users: User.all }
    end

  end
end
