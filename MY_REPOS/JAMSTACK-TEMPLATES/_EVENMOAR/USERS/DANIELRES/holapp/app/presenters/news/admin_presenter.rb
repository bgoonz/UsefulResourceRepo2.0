module News

  class AdminPresenter < Erector::Widget

    needs :collection, :view_context

    include Support::PresenterHelpers

    def content
      table do
        tr do
          th 'Actions'
          td do
            a class: 'btn btn-success', href: @view_context.news_dry_run_send_digests_path do
              i class: 'glyphicon glyphicon-play-circle'
              text " Dry run"
            end
            text ' '
            a class: 'btn btn-warning', href: @view_context.news_send_digests_path, 'data-confirm' =>  'Are you sure ?' do
              i class: 'glyphicon glyphicon-envelope'
              text " Send news digests"
            end
          end

        end

        tbody( 'data-purpose' => 'users_configs-editor' ) do
          @collection.each do |u|
            tr do
              th link_to(u, u)
              td do
                text @view_context.render( partial: "news/user_configs/user_config", object: News::UserConfig.where(user: u).first_or_create)
              end
            end
          end
        end

      end
    end


  end

end
