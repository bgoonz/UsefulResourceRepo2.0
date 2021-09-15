module PresentsAForm
  private
    def present_form locals={}
      return '' unless authorized?
      raise 'view_context missing' unless @view_context
      @view_context.render partial: "use_cases/#{ self.class.name.underscore }/form",
                            locals: locals
    end
end
