class ProjectPresenter < Erector::Widget

  needs :viewer, :project, :view_context

  include Support::PresenterHelpers

  def content
    page_head_html
    panel{ project_details_html }
    panel{ memberships_html }
    panel{ skills_html }
    panel{ dangerous_actions_menu_html }
  end


  private

    def page_head_html
      h1 @project.name
    end

    def project_details_html
      table.details do
        tr do
          th 'Name'
          td best_in_place @project, :name
        end
        tr do
          th 'Description'
          td do
            random_val = (rand * 1000).to_i
            best_in_place_activator(random_val, :description)
            text best_in_place @project, :description,
                    type: :textarea,
                     nil: '…',
            display_with: ->(txt){ render_description(txt) },
               activator: "##{ random_val }"
          end
        end
        tr do
          th 'Start'
          td editable_date_field(:starts_at)
        end
        tr do
          th 'End'
          td editable_date_field(:ends_at)
        end
      end
    end

    def editable_date_field(field_name)
      best_in_place @project, field_name, type: :date, display_with: ->(d){ pretty_date(d) }
    end

    def memberships_html
      text MembershipsPresenter.new(
                  viewer: @viewer,
           source_object: @project,
            caption_text: 'Members',
            view_context: @view_context,
          ).to_html
      text AddingAMembershipFromProject
            .new(@viewer, Membership.new(project: @project))
            .view_context(@view_context)
            .get_user_input
    end

    def skills_html
      text ViewingATaggableTaggings.new(@viewer, @project, :skills).view_context(@view_context).call
      text AddingTaggings
            .new(@viewer, @project, nil, :skills)
            .view_context(@view_context)
            .get_user_input
    end

    def dangerous_actions_menu_html
      h3 'Dangerous actions'
      actions_menu do
        li delete_resource_link("/projects/#{@project.to_param}")
      end
    end

end
