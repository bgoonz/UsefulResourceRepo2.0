require 'rubygems'
require 'bundler/setup'
require 'rspec'

require 'action_controller'
require 'active_record'

require 'archivable'

ActiveRecord::Base.establish_connection(adapter: 'sqlite3',
                                        database: ':memory:')

ActiveRecord::Schema.define do
 self.verbose = false

   create_table :fakes, cascade: true do |t|
     t.boolean :archived
   end
end

class Fake < ActiveRecord::Base
  include Archivable::Model

  def toggle(dont_care)
    self.archived = archived ? false : true
  end

  def archived?
    !!archived
  end
end

class UnarchivableFake
end

class FakesController < ActionController::Base
  include Archivable::Controller

  attr_accessor :fake

  def set_fake
    @fake = Fake.new
  end

  def get_fake
    @fake
  end

  def render(dont_care, also_dont_care)
  end

  def redirect_to(dont_care)
  end

  def edit_fake_path(dont_care)
  end
end
