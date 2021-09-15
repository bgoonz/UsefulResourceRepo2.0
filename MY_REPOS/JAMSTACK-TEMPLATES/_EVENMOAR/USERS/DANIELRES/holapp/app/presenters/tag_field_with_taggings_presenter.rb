class TagFieldWithTaggingsPresenter < Erector::Widget

  needs :taggings, :tag_field, :viewed_from, :view_context

  include Support::PresenterHelpers

  def content(options={})
    table the("#{ @tag_field }-list") do
      caption caption_text

      if tagging = taggings.first
        tr do
          th 'Level' if show_quantifier?(tagging)
          th [ to_header_text(@tag_field), 'name' ].join(' ') unless @viewed_from == :tag
          th domain_language(tagging.taggable_type)           unless @viewed_from == :taggable
          th [ to_header_text(@tag_field), 'description for this', domain_language(tagging.taggable_type).to_s.downcase ].join(' ')
          th 'Actions'
        end
      end

      taggings.each do |tagging|
        tr do
          if show_quantifier?(tagging)
            td.quantifier do
              text best_in_place tagging, :quantifier, collection: quantifier_values, type: :select
            end
          end
          unless @viewed_from == :tag
            td.name do
              text link_to(tagging.tag.name, tagging.tag)
            end
          end
          unless @viewed_from == :taggable
            td.name do
              text  link_to(tagging.taggable_name, tagging.taggable)
            end
          end
          td.description do
            text best_in_place tagging, :description, type: :textarea, nil: '…'
          end
          td.actions do
            li do
              text link_to 'delete', tagging, method: :delete, data: { purpose: 'delete-action', confirm: 'Are you sure ?' }
            end
          end
        end
      end

    end

  end

  private

    def to_header_text(str)
      str.to_s.singularize.humanize.capitalize
    end

    def show_quantifier?(tagging)
      true unless tagging.taggable_type == 'Tag'
    end

    def caption_text
      case @viewed_from
      when :tag      then @tag_field.to_s.gsub('parents', 'children')
      when :taggable then @tag_field.to_s
      end.humanize
    end

    def taggings
      @taggings.sort{ |a,b| b.quantifier.to_i <=> a.quantifier.to_i }
    end

    def quantifier_values
      [
        [ 0, pretty_quantifier(0) ],
        [ 1, pretty_quantifier(1) ],
        [ 2, pretty_quantifier(2) ],
        [ 3, pretty_quantifier(3) ],
        [ 4, pretty_quantifier(4) ],
        [ 5, pretty_quantifier(5) ],
      ]
    end

end
