module Support
  module PresenterHelpers
    def domain_language text
      text == 'User' ? 'Person' : text
    end
    def the(purpose_name)
      {'data-purpose' => purpose_name }
    end
    def col(width)
      div(class: "col-md-#{width}"){ yield }
    end
    def panel(*args, heading: nil, &block)
      div(*args, class: 'panel panel-default') do
        div(class: 'panel-heading'){ text heading } if heading
        div(class: 'panel-body') do
          block.call if block_given?
        end
      end
    end
    def row
      div(class: "row"){ yield }
    end
    def actions_menu
      element(:menu, the('actions-menu') ).actions_menu do
        ul do
          yield
        end
      end
    end
    def delete_resource_link(resource)
      confirm_message = Rails.env == 'test' ? false : 'Are you sure ?'
      @view_context.link_to("delete", resource, method: :delete, data: { purpose: 'delete-action', confirm: confirm_message }, class: 'btn btn-default btn-xs')
    end
    def best_in_place *args
      @view_context.best_in_place *args
    end
    def link_to *args
      @view_context.link_to *args
    end
    def pretty_quantifier(value)
      representations = {
        0 => '—'    ,
        1 => '▮▯▯▯▯',
        2 => '▮▮▯▯▯',
        3 => '▮▮▮▯▯',
        4 => '▮▮▮▮▯',
        5 => '▮▮▮▮▮',
      }
      representations.fetch(value)
    end
    def pretty_date date
      @view_context.localize(date, format: :simple) rescue ''
    end
    def render_description(markdown_input)
      markdown_filter(markdown_input)
    end
    def render_excerpt(markdown_input)
      smart_truncate(render_description(markdown_input))
    end
    def best_in_place_activator(id, field_name)
      params = { id: id.to_s, style: 'float: right' }.merge the("#{ field_name }_edit_action")
      small(params){ a 'edit' }
    end

    private

      def markdown_filter(markdown_input)
        HTML::Pipeline::MarkdownFilter.new(markdown_input).call.html_safe
      end
      def smart_truncate(html)
        @view_context.truncate_html(html, length: 180, omission: '…')
      end

  end
end
