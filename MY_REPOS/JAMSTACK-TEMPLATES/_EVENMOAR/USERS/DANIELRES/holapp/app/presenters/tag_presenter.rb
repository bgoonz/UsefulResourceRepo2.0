class TagPresenter < Erector::Widget

  needs :viewer, :tag, :view_context

  include Support::PresenterHelpers

  def content
    row do
      col(8){ page_head_html }
      col(8){ panel{ tag_details_html } }
      col(4){ panel{ quick_add_to_current_user_html } }
      col(8) do
          parents_html
          dangerous_actions_menu_html
      end

      col( 4){ tag_trees }
    end
  end


  private

    def page_head_html
      h1 @tag.name
    end

    def quick_add_to_current_user_html
      ul.menu do
        Tagging::PEOPLE_TAG_FIELDS.each do |tag_field|
          if user_has_tag_on?(@viewer, @tag, tag_field)
            li(class: "btn btn-default btn-sm") do
              span '', class: "glyphicon glyphicon-ok"
              text " In my #{tag_field}"
            end
            br
          else
            li TaggingAResource
                .new(@viewer, @tag, tag_field, @viewer)
                .view_context(@view_context)
                .get_user_input(
                  text: "Add to my #{ tag_field }"
                )
          end
        end
      end
    end

    def user_has_tag_on?(user, tag, tag_field)
      user.taggings.select{ |t| t.context == tag_field.to_s }.map(&:tag).include?(@tag)
    end

    def tag_details_html
      table.details do
        tr do
          th 'Name'
          td best_in_place @tag, :name,  path: "/tags/#{ @tag.id }", nil: '…'
        end
        tr do
          th 'Description'
          td do
            random_val = (rand * 1000).to_i
            best_in_place_activator(random_val, :description)
            text best_in_place @tag, :description,
                    path: "/tags/#{ @tag.id }",
                    type: :textarea,
                     nil: '…',
            display_with: ->(txt){ render_description(txt) },
               activator: "##{ random_val }"
          end
        end
      end
    end


    def tag_trees
      text TagTreesPresenter
            .new(tag: @tag, view_context: @view_context, viewer_taggings: @viewer.taggings )
            .to_html
    end

    def parents_html
      text ViewingATagTaggings
            .new(@viewer, @tag)
            .view_context(@view_context)
            .call
      panel do
        text ViewingATaggableTaggings
              .new(@viewer, @tag, :tag_parents)
              .view_context(@view_context)
              .call
        text AddingTaggings
              .new(@viewer, @tag, nil, :tag_parents)
              .view_context(@view_context)
              .get_user_input
      end
    end


    def dangerous_actions_menu_html
      h3 'Dangerous actions'
      row do
        if FeaturesProfile.feature? :absorb_tag
          col(6) do
            panel do
              text MergingTags
                    .new(@viewer, @tag, nil)
                    .view_context(@view_context)
                    .get_user_input
            end
          end
        end
        col(6) do
          panel do
            actions_menu do
              li delete_resource_link(@tag)
            end
          end
        end
      end
    end


end
