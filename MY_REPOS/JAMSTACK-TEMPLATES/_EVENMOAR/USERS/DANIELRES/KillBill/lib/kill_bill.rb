require 'bundler'
Bundler.require

$LOAD_PATH.unshift 'models'
require 'invoice'
require 'invoice_store'
require 'invoice_exhibit'

class KillBill < Sinatra::Base

  set :root, [ File.dirname(__FILE__), '/..'].join

  get( '/:filename.css' ){ sass params[:filename].to_sym, views: "assets/stylesheets/" }

  def initialize
    super
    @@invoice_store ||= load_invoice_store_with_contents
  end

  def self.invoice_store= store
    @@invoice_store = store
  end


  get '/' do
    presentable_invoices = invoice_store.entries.map{ |e| InvoiceExhibit.new( e ) }
    haml :index, locals: { invoices: presentable_invoices }, layout: false
  end

  get '/:invoice_number' do
    invoice             = invoice_store.find params[:invoice_number]
    presentable_invoice = InvoiceExhibit.new( invoice ).to_html
  end


  private

    def invoice_store
      @@invoice_store
    end

    def load_invoice_store_with_contents
      require_relative '../db/data'
      STORE
    end

end
