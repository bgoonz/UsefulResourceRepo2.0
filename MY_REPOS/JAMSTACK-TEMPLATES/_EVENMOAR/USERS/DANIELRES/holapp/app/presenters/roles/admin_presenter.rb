module Roles

  class AdminPresenter < Erector::Widget

    needs :collection, :view_context

    include Support::PresenterHelpers

    def content
      table do
        tr do
          th 'Users'
          th 'Roles'
        end

        tbody( 'data-purpose' => 'users_roles-editor' ) do
          @collection.each do |u|
            tr do
              th link_to(u, u)
              td do
                # text best_in_place u, :role_ids, type: :select, collection: Role.all.map{ |i| [i.id, i.name] }, html_attrs: { multiple: true }, nil: u.roles_name.join(',')
                text @view_context.render partial: '/presenters/roles/admin/form', locals: { user: u }
              end
            end
          end
        end

      end
    end

    def roles
      @roles ||= Role.all
    end

  end

end
