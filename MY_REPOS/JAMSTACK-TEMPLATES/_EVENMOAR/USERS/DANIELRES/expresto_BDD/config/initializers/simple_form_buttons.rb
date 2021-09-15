module SimpleForm
  class FormBuilder < ActionView::Helpers::FormBuilder

    def submit_button title=nil, options={}, &block
      options = {
          type: 'submit',
          class: 'btn btn-primary',
          data:{ purpose: 'submit-button' }
      }.merge options
      title, options = nil, title if title.is_a? Hash
      title ||= submit_default_value
      @template.content_tag :button, title, options
    end

  end
end