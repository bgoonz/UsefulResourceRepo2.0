class InvoiceStore

  attr_reader :owner

  def initialize options={}
    @@entries = []
    @owner = options[:owner]
  end

  def new_invoice *args
    number  = args.detect{ |a| a.kind_of? Integer } || nil
    options = args.detect{ |a| a.kind_of? Hash    } || {}
    options = { store: self }.merge( options )
    Invoice.new( handle_number( number ), options )
      .tap{ |invoice| @@entries << invoice }
  end

  def entries
    @@entries
  end

  def find number
    entries.select{ |e| e.number == number.to_i }.first rescue nil
  end

  private

    def handle_number number
      raise( StandardError, "An invoice with this number already exists" ) if find number
      number || entries.last.number + 1 rescue 1
    end

end
