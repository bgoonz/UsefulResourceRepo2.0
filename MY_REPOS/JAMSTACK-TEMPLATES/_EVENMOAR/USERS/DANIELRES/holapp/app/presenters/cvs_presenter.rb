class CvsPresenter < Erector::Widget

  needs :collection, :view_context

  include Support::PresenterHelpers

  def content
    row do
      col(6) do
        panel do


          table the('cvs-list') do
            caption 'Cvs'
            @collection.sort{ |x,y| x.name <=> y.name }.each do |p|
              tr do
                td.image @view_context.image_tag(p.image_url, width: 64)
                td.name link_to p.name, p
                td.cv do
                  if p.cv_url.present?
                    link_text = @view_context
                                  .truncate(
                                    p.cv_url,
                                    length: 150,
                                    omission: '…')
                                  .sub(/https?:\/\//, '')
                                  .sub('%20', ' ')
                    text link_to link_text, p.cv_url, title: p.cv_url
                  end
                end
              end
            end
          end


        end
      end
    end
  end

end
