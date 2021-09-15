class TagTreesPresenter < Erector::Widget

  needs :tag, :view_context, :viewer_taggings

  include Support::PresenterHelpers

  def content
    tag_trees(@tag)
  end

  private

    def poles(tag)
      Array( tag.pole? ? tag : tag.parents.map{|p| poles(p) } ).flatten
    end

    def tag_trees tag
      trees = []
      poles(tag).each do |p|
        trees << capture_content do
          panel.tag_tree do
            ul do
              tag_tree_branch(p)
            end
          end
        end
      end
      trees.uniq! # eliminate identical trees
      rawtext trees.join
    end

    def highlight?
      true unless @view_context.params['action'] == 'index'
    end

     def tag_tree_branch(tag)
      css_class = (highlight? && tag == @tag) ? 'active' : ''
      li(class: css_class) do
        if tag == @tag
          strong{ u link_to tag.name, tag }
        else
          text link_to(tag.name, tag)
        end
        tag_badges(tag)
        if tag.children.any?
          ul do
            tag
              .children
              .sort{|a,b| a.name <=> b.name }
              .each do |t|
                tag_tree_branch(t)
            end
          end
        end
      end
    end

    def tag_badges(tag)
      text ' '
      tag_fields = tag.taggings
                    .select{ |t|t.taggable_type == 'User' }
                    .select{ |t|t.taggable.listable? }
                    .map(&:context)
                    .uniq
                    .sort
      tag_fields.each do |tf|
        users_count = tag.taggings
                      .select{|t| t.taggable_type == "User" && t.context == tf }
                      .select{ |t|t.taggable.listable? }
                      .count
        tag_score = tag.taggings
                      .select{|t| t.taggable_type == "User" && t.context == tf }
                      .select{ |t|t.taggable.listable? }
                      .map{ |t| t.quantifier.to_i }
                      .sum
        span title: "#{ users_count } persons have this #{ tf.singularize }, totalling a score of #{ tag_score }", class: [:badge, tf] do
          text users_count
          sup " #{ tag_score }"
        end
        if @viewer_taggings.map(&:tag).include?(tag)
          sup do
            text ' '
            span class: ['glyphicon', 'glyphicon-ok', tf], title: "In my #{ tf }"
          end
        end
        text ' '
      end
    end

end
