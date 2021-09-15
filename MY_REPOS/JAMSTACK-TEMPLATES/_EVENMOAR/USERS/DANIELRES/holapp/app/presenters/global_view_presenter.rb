class GlobalViewPresenter < Erector::Widget

  needs :viewer, :view_context

  include Support::PresenterHelpers

  def content
    row do
      col(12) do
        panel do
          text ViewingPeople.new(@viewer).view_context(@view_context).call
          text AddingAPerson.new(@viewer).view_context(@view_context).get_user_input
        end
      end
      col(6) do
        panel do
          text ViewingProjects.new(@viewer).view_context(@view_context).call
          text AddingAProject.new(@viewer).view_context(@view_context).get_user_input
        end
      end if FeaturesProfile.feature? :projects
    end

    row do
      col(6) do
        panel do
          text TopsByTagFieldPresenter.new(tag_field: :motivations, min_level: 3, view_context: @view_context).to_html
        end
      end
      col(6) do
        panel do
          text TopsByTagFieldPresenter.new(tag_field: :skills,      min_level: 3, view_context: @view_context).to_html
        end
      end
    end


  end

end
