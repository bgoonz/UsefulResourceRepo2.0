class ProjectsPresenter < Erector::Widget

  needs :collection, :view_context

  include Support::PresenterHelpers

  def content
    div the('projects-list') do
      projects_table( future_projects , 'Opportunities'   )
      projects_table( current_projects, 'Current projects')
      projects_table( past_projects   , 'Past projects'   )
    end
  end


  private

    def past_projects
      @collection.select{ |p| p.ends_at && p.ends_at < Time.zone.now }
    end

    def current_projects
      @collection.select{ |p| p.starts_at && p.starts_at < Time.zone.now } - past_projects
    end

    def future_projects
      @collection - past_projects - current_projects
    end

    def projects_table collection, caption_text
      table(class: 'projects-list') do
        caption caption_text
        collection.each do |p|
          tr do
            td.name do
              text link_to p.name, p
            end
            td.time do
              table do
                if p.starts_at
                  tr do
                    th 'from'
                    td pretty_date(p.starts_at) if p.starts_at
                  end
                end
                if p.ends_at
                  tr do
                    th 'to'
                    td pretty_date(p.ends_at) if p.ends_at
                  end
                end
              end
            end
            td.description render_excerpt(p.description)
          end
        end
      end

    end


end
