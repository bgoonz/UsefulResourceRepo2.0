class TagsPresenter < Erector::Widget

  needs :collection, :view_context, :viewer

  include Support::PresenterHelpers

  def content
    h2 'Tags'

    p do
      b 'Competence centers:'
      text yes_poles.map{ |pole| link_to(pole, "#pole_#{ pole.id}" )}.join(' | ').html_safe
    end

    row do
      col(9) do
        row do
          yes_poles.each do |pole|
            col(4) do
              a.anchor '', id: "pole_#{ pole.id}", name: "#pole_#{ pole.id}"
              text  TagTreesPresenter
                      .new(tag: pole, view_context: @view_context, viewer_taggings: @viewer.taggings.includes(:tag) )
                      .to_html
            end
          end
        end
      end
      col(3) do
        panel do
          tags_table free_tags, 'Orphan tags'
        end
      end
    end
  end

  private

    def all_tags
      @collection.order('name')
    end

    def yes_poles
      Tag.poles
    end

    def free_tags
      Tag.free
    end

    def tags_table tags, caption_text
      table the('tags-list') do
        caption caption_text
        tags
          .each do |t|
          tr do
            td.name        link_to t.name, t
            td.description render_excerpt(t.description)
          end
        end
      end

    end

end
