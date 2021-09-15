require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html

  protect_from_forgery
  before_filter :load_available_languages, :set_current_locale

private

  def set_current_locale
    I18n::locale = params[:locale] || :en
  end

  def load_available_languages
    @available_languages = Language.all
  end

  def default_url_options options = {}
    logger.debug "default_url_options is passed options: #{options.inspect}\n"
    { locale: I18n.locale }
  end

end
