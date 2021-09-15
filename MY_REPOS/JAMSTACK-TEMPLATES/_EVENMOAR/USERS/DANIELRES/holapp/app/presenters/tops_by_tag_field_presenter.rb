class TopsByTagFieldPresenter < Erector::Widget

  include Support::PresenterHelpers

  needs :tag_field, :min_level, :view_context

  attr_writer :taggings

  def content
    @taggings ||= Tagging.where(context: @tag_field).where("quantifier >= ?", @min_level)
                         .includes(:tag)
                         .includes(:taggable)
    @taggings.to_a.select!{ |t| t.quantifier >= @min_level  }

    div the("top-#{ @tag_field }") do
      h2 "Top #{ @tag_field }"
      @taggings
        .group_by(&:taggable_type)
        .each {|taggable_type, taggings| taggings_table(taggable_type, taggings) }
    end
  end


  private

    def taggings_table(taggable_type, taggings)
      table do
        caption domain_language(taggable_type).pluralize
        taggings
          .group_by(&:tag)
          .sort{ |a,b| b[1].count <=> a[1].count }
          .each do |tag, taggings|
            tr do
              td.name link_to(tag.name, tag)
              td do
                taggings_taggables(taggings)
              end
            end
          end
      end
    end

    def taggings_taggables(taggings)
      taggings
        .sort{ |a,b| b.quantifier <=> a.quantifier }
        .reject{ |tag| tag.taggable.respond_to?(:listable?) && !tag.taggable.listable? }
        .group_by(&:quantifier)
        .each do |quantifier, taggings|
          dl.inline do
            dt pretty_quantifier(quantifier)
            dd rawtext taggings.map{ |t|
              link_to(t.taggable.name, t.taggable)
              }.join(', ')
          end
      end
    end

end

