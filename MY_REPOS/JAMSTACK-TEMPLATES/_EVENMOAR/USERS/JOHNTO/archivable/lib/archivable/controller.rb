require 'active_support/concern'
require 'meta_magic'

module Archivable
  module Controller
    include MetaMagic::Controller
    extend ActiveSupport::Concern

    def archive
      archivable_model = set_model_instance_variable
      archivable_model.toggle(:archived)

      if archivable_model.save
        redirect_to action: :show
      else
        render :edit
      end
    end

    def archived
      instance_variable_set(:"@#{ controller_name }", 
                            policy_scope(get_model_class).where(archived: true))
      render :index
    end

    def get_archivable_flash(model, opts = {})
      "#{ model.class.name } was"\
      "#{ ' not' unless opts[:success] } "\
      "#{ model.archived ? :archived : :unarchived } "\
      "successfully."
    end
  end
end
