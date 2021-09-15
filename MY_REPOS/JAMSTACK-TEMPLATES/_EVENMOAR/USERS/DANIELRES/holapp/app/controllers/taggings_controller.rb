class TaggingsController < ApplicationController
  before_filter :authenticate_user!

  include ResourceInPlaceUpdate
  include ResourceDestroy


  def show
    tagging  = Tagging.find(params[:id])
    taggable = tagging.taggable
    redirect_to taggable
  end


  def create
    taggable_id   = params[:tagging][:taggable_id]
    taggable_type = params[:tagging][:taggable_type]
    tag_list      = params[:tagging][:tag_list]
    tag_field     = params[:tagging][:tag_field]
    tagger        = current_user
    taggable      = taggable_type.constantize.find(taggable_id)
    AddingTaggings
      .new(tagger, taggable, tag_list, tag_field)
      .call(
        success: ->{ redirect_to :back, notice: 'Tags applied successfully' },
        failure: ->{ redirect_to :back, alert:  'Could not apply tags'      },
      )
  end


  private

    def resource_params
      params
        .require(:tagging)
        .permit(
          :description,
          :quantifier,
        )
    end

    def resource
      Tagging.find(params[:id])
    end

end
