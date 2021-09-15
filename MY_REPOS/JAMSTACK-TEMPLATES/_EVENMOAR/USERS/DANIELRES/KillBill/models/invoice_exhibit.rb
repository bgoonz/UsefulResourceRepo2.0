require 'haml'

$LOAD_PATH.unshift 'models'
require 'text_evaluator'
require 'r18n-core'



class InvoiceExhibit < SimpleDelegator

  def initialize model, options = {}
    __setobj__( model )
    @locale = model.locale
    R18n.default_places = './i18n/'
    R18n.set( @locale )
  end

  def locale        ; @locale.to_sym end

  def hourly_rate   ; format_price super end
  def ex_vat_total  ; format_price super end
  def vat_total     ; format_price super end
  def inc_vat_total ; format_price super end


  def emit_date ; format_date super end
  def due_date  ; format_date super end

  def owner   ; format_person  super end
  def client  ; format_client  super end
  def entries ; format_entries super end

  def to_html
    haml :invoice, number: number,
                    owner: owner,
                   client: client,
                emit_date: emit_date,
                 due_date: due_date,
                  entries: entries,
                      vat: vat,
              hourly_rate: hourly_rate,
             ex_vat_total: ex_vat_total,
                vat_total: vat_total,
            inc_vat_total: inc_vat_total,
                        t: R18n.get.t

  end


  private

    def haml identifier, locals = {}, &block
      Haml::Engine.new( File.read "views/#{identifier}.html.haml" ).render( Object.new, locals ) do
        block.call if block
      end
    end

    def format_price price
      "#{currency_symbol}%.2f" % price
    end

    def format_date date
      R18n.get.l date.to_date
    end
    def format_person person
      output = []
      output << person.name
      output << person.address
      output << person.phone
      output << person.email
      output << "TVA: #{person.vat_number}"
      output << "<br />"
      output << "IBAN: #{person.iban}"
      output << "BIC: #{person.bic}"
      output << person.bank_address
      output.compact.join '<br />'
    end
    def format_client client
      output = []
      output << client.first_name
      output << client.last_name
      output << client.company_name
      output << client.address
      output << "TVA: #{client.vat_number}"
      output.compact.join '<br />'
    end
    def format_entries entries
      entries.map{ |e| format_entry e }
    end
    def format_entry entry
      ex_vat_total = __getobj__.hourly_rate * entry.hours
      ex_vat_total = format_price( ex_vat_total )
      e        = TextEvaluator.new
      new_desc = e.evaluate entry.desc, context: __getobj__, entry: entry, separator: '<br />'
      entry.define_singleton_method(:desc){ new_desc }
      entry.define_singleton_method(:ex_vat_total){ ex_vat_total }
      entry
    end
    def currency_symbol
      case currency = __getobj__.currency
      when 'dollar' then '$'
      when 'euro'   then '€'
      else
        raise StandardError, "Can't determine currency symbol for '#{currency}'"
      end
    end

end