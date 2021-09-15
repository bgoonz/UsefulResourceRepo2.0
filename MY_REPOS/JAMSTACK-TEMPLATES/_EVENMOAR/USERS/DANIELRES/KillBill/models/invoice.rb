require 'time'
require 'ostruct'

class Invoice

  class NullClient
    def method_missing m, *args
      # "client #{m} missing".tap{ |message| warn message }
    end
  end

  attr_reader :number, :entries, :hourly_rate, :vat, :client, :store, :emit_date, :currency

  def initialize number, options = {}
    @number       = number.to_i
    @hourly_rate  = options[:hourly_rate].to_f
    @vat          = options[:vat].to_f
    @entries    ||= []
    @client       = options[:client] || NullClient.new
    @store        = options[:store]
    @emit_date    = Time.parse( options[:emit_date] || Time.now.to_s )
    @currency     = ( options[:currency] || 'euro' ).to_s
    @locale       = options[:locale]
  end

  def owner
    @store.owner
  end

  def add_entry entry
    entry = OpenStruct.new( entry ) if entry.kind_of? Hash
    @entries << entry
  end

  def due_date
    emit_date + 30 * 60 * 60 * 24
  end

  def total_hours
    @entries.map(&:hours).inject(:+) || 0
  end

  def ex_vat_total
    ( total_hours * @hourly_rate ).round 2
  end

  def vat_total
    ( total_hours * @hourly_rate  * @vat / 100 ).round 2
  end

  def inc_vat_total
    ( ex_vat_total + vat_total ).round 2
  end

  def page_path
    "/#{number}"
  end

  def locale
    @locale || 'en'
  end


end
