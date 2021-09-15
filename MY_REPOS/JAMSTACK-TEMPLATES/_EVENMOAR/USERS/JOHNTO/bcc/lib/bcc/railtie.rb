module Bcc
  class Railtie < Rails::Railtie
    initializer "bcc.register_interceptor" do
      ActiveSupport.on_load :action_mailer do
        ActionMailer::Base.register_interceptor(Bcc::Base)
      end
    end
  end
end
