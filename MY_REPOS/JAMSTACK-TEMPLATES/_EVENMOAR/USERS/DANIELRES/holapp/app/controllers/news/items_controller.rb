module News
  class ItemsController < ApplicationController

    before_filter :authenticate_user!

    include ResourceInPlaceUpdate

    def show
      render inline: ItemPresenter
                      .new(viewer: current_user, item: resource, view_context: view_context)
                      .to_html,
                      layout: true
    end

    def destroy
      DestroyingAResource
        .new(current_user, resource)
        .call(
          success: ->{ redirect_to news_items_path },
          failure: ->{ redirect_to :back },
        )
    end


    private

      def resource
        Item.find(params[:id])
      end

      def resource_params
        params
          .require(:news_item)
          .permit(
            :summary,
            :body,
            :language,
            :author_id,
          )
      end

  end
end
