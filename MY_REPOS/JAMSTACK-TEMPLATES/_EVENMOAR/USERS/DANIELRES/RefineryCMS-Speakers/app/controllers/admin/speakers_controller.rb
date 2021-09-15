module Admin
  class SpeakersController < Admin::BaseController

    crudify :speaker, :xhr_paging => true

  end
end
