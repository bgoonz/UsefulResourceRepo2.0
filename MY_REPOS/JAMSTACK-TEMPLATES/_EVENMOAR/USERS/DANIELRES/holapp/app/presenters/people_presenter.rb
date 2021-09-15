class PeoplePresenter < Erector::Widget

  needs :collection, :view_context

  include Support::PresenterHelpers

  def content
    table the('people-list') do
      caption 'People'
      @collection.sort{ |x,y| x.name <=> y.name }.each do |p|
        tr do
          td.image @view_context.image_tag(p.image_url, width: 64)
          td.name link_to p.name, p
          td.description render_excerpt(p.description)
        end
      end
    end

  end

end
