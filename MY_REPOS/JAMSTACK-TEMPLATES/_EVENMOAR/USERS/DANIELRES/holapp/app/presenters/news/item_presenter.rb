module News
  class ItemPresenter < Erector::Widget

    needs :viewer, :item, :view_context

    include ::Support::PresenterHelpers

    def content
      row do
        col(6){ panel{ item_details_html1 } }
        col(6){ panel{ item_details_html2 } }
      end
      row do
        col(6){ panel{ taggings_on_html(:themes) } }
      end
      row do
        col(6){ panel{ dangerous_actions_menu_html    } }
      end

    end

    private

      def renderer
        @renderer ||= MarkdownRenderer.new
      end


      def taggings_on_html(tag_field)
        text ViewingATaggableTaggings
              .new(@viewer, @item, tag_field)
              .view_context(@view_context)
              .call
        text AddingTaggings
              .new(@viewer, @item, nil, tag_field)
              .view_context(@view_context)
              .get_user_input
      end

      def dangerous_actions_menu_html
        h3 'Dangerous actions'
        actions_menu do
          li delete_resource_link(@item)
        end
      end

    def item_details_html1
      table.details do
        tr do
          th 'Summary'
          td do
            random_val = (rand * 1000).to_i
            best_in_place_activator(random_val, :summary)
            text best_in_place @item, :summary,
                    type: :textarea,
                    path: "/news/#{@item.to_param}",
                     nil: '…',
            display_with: ->(txt){ render_description(txt) },
               activator: "##{ random_val }"
          end
        end
        tr do
          th 'Body'
          td do
            random_val = (rand * 1000).to_i
            best_in_place_activator(random_val, :body)
            text best_in_place @item, :body,
                    type: :textarea,
                    path: "/news/#{@item.to_param}",
                     nil: '…',
            display_with: ->(txt){ render_description(txt) },
               activator: "##{ random_val }"
          end
        end
      end
    end

    def item_details_html2
      table.details do
        tr('data-purpose' => 'language-editor') do
          th 'Language'
          td best_in_place @item, :language , collection: Item::LANGUAGES.map{ |l| [ l, l ]  }, type: :select
        end
        tr('data-purpose' => 'author-editor') do
          th 'Author'
          td best_in_place @item, :author_id, collection: User.all.map{ |u| [ u.id, u.name ] }, type: :select
        end
        tr do
          th 'Created at'
          td @view_context.localize( @item.created_at, format: :short)
        end
        unless @item.updated_at == @item.created_at
          tr do
            th 'Edited at'
            td @view_context.localize( @item.updated_at, format: :short)
          end
        end
      end
    end



  end

end

