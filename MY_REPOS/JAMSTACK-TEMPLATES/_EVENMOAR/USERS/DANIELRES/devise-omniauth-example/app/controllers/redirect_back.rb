module RedirectBack
  def self.included(a_controller)
    a_controller.module_eval do
      extend ClassMethods
      include InstanceMethods

      around_filter :store_location
    end
  end

  module ClassMethods
    def actions_not_storing_location
      @actions_not_storing_location ||= []
    end

    def disable_store_location(*actions)
      actions_not_storing_location.concat(actions.collect(&:to_sym))
    end
  end

  module InstanceMethods
    def store_location
      yield
      session["user_return_to"] = request.url if should_store_location?
    end

    def should_store_location?
      request.get? && !request.xhr? && (response_is_success_or_redirect?) &&
        !self.class.actions_not_storing_location.include?(action_name.to_sym)
    end

    def response_is_success_or_redirect?
      response_code = response.status.to_s[0,3].to_i rescue 0
      response_code == 200 || (300..399).include?(response_code)
    end

#    def redirect_back(default = root_path)
#      redirect_to(session && session["user_return_to"] ? session["user_return_to"] : default)
#    end
  end
end