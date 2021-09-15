module News
  class UserConfigsController < ApplicationController
    before_filter :authenticate_user!

    include ResourceInPlaceUpdate

    def show
      redirect_to news_admin_path
    end

    private

      def resource
        News::UserConfig.find(params[:id])
      end

      def resource_params
        params
          .require(:news_user_config)
          .permit(
            :receive_digest,
          )
      end

  end
end
