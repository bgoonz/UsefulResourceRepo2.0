require "bcc/version"
require "bcc/railtie" if defined?(Rails::Railtie)

module Bcc
  class Base
    def self.delivering_email(message)
      return unless BCC_EMAILS.present?
      message.bcc ||= []
      message.bcc += BCC_EMAILS
    end
  end
end
