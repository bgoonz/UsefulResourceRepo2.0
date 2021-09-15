require 'active_support/concern'
require 'active_record'

module Archivable
  module Model
    extend ActiveSupport::Concern

    included do
      scope :archived, -> { where(archived: true) }
      scope :unarchived, -> { where(archived: false) }
    end

    def archived?
      archived
    end

    def archive!(save_args = {})
      self.archived = true
      save(save_args)
    end

    def unarchive!
      self.archived = false
      save
    end

    def is_archivable?
      respond_to?(:archived)
    end
  end
end
