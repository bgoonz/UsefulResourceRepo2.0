class ActivitiesPresenter < Erector::Widget

  needs :collection, :view_context

  include Support::PresenterHelpers

  def content
      row do
        col(12){ panel{ activities_table(@collection, 'Activities') } }
      end
  end


  private

    def activities_table collection, caption_text
      table('data-purpose' => 'activities-list', class: 'activities-list' ) do
        caption caption_text
        tr do
          th.time    'Time'
          th.user    'User'
          th.action  'Action'
          th.subject 'Related object(s)'
          th.details 'Details'
        end
        collection.each do |a|
          tr do
            td.time @view_context.time_ago_in_words(a.created_at) + " ago"
            td.name link_to(a.user, a.user)
            activity_details(a)
          end
        end
      end
    end

    def activity_details(a)
      object_name = a.details['object_name']
      object_type = a.details['object_type'].to_s.downcase
      case a.action
      when 'deleted'
        td "deleted"
        td object_type.sub('::',': ')
        td object_name
      when 'updated'
        td 'updated'
        td "#{a.object.class.name.downcase.sub('::',': ')} #{ a.details.keys.join(', ')}"
        td.object do
          text link_to(a.object, a.object) if a.object
        end
      when 'added'
        td "added"
        td object_type
        td.object do
          text link_to(a.object, a.object) if a.object
        end
        td
      when 'added_taggings'
        td "tagged on #{ a.details['tag_field'] }"
        td.object do
          text link_to(a.object.to_s.truncate(60), a.object) if a.object
        end
        td "#{ a.details['tag_list'].split(',').map{|t| @view_context.link_to_if(Tag.find_by_name(t), t, Tag.find_by_name(t) )}.join(', ') }".html_safe
      when 'merged_tags'
        td 'merged'
        td "tag '#{ a.details['slave_name'] }' into"
        td.object do
          text @view_context.link_to_if(a.object, a.details['object_name'], a.object)
        end
      when 'sent_news_digests'
        random_id = 'elt' + ( rand * 10_000 ).to_i.to_s
        td 'sent news digests'
        td 'all users'
        td( class: 'collapse-group' ) do
          p{ a 'View log »', class: 'btn btn-default', 'data-toggle' => 'collapse', 'data-target' => "##{random_id}" }
          pre a.details['log_output'], class: 'collapse', id: random_id
        end
      else
        td.action a.action.humanize.downcase
      end

    end

end
