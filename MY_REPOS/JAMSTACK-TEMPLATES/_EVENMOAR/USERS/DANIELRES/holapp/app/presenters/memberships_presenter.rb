class MembershipsPresenter < Erector::Widget

  needs :viewer, :source_object, :caption_text, :view_context

  include Support::PresenterHelpers

  def content
    memberships_table
  end


  private

    def memberships_table
      table the('memberships-list') do
        caption @caption_text
        @source_object.memberships.each do |m|
          tr do
            td.name do
              text link_to(m.person.name , m.person)  if @source_object.kind_of?(Project)
              text link_to(m.project.name, m.project) if @source_object.kind_of?(User)
            end
            td.durations do
              membership_durations(m)
            end
            td.description best_in_place(m, :description, type: :textarea, nil: '…')
            td.actions do
              ul do
                li delete_resource_link(m)
              end
            end
          end
        end
      end
    end

    def membership_durations(membership)
      durations = Duration.where(durable_id: membership.id, durable_type: 'Membership')
      text AddingADuration.new(@viewer, membership).view_context(@view_context).get_user_input
      if durations.any?
        table( 'data-purpose' => 'durations-list' ) do
          tr do
            th 'from'
            th 'to'
          end
          durations.each do |d|
            tr.duration do
              td best_in_place(d, :starts_at, type: :date, display_with: ->(d){ pretty_date(d) }),
                class: "#{ 'inherited' if d.starts_at_inherited? }",
                title: "#{ 'inherited from project' if d.starts_at_inherited? }"

              td best_in_place(d, :ends_at  , type: :date, display_with: ->(d){ pretty_date(d) }),
                class: "#{ 'inherited' if d.ends_at_inherited? }",
                title: "#{ 'inherited from project' if d.ends_at_inherited? }"

              td best_in_place d, :quantifier, collection: quantifier_values, type: :select
              td link_to 'x', d, method: :delete, data: { purpose: 'delete-action', confirm: 'Are you sure ?' }
            end
          end
        end
      end
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
