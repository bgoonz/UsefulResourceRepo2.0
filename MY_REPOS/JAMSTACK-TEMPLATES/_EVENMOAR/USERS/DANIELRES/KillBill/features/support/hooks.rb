
Before do

  class NullOwner
    def method_missing *args ; end
  end

  @invoice_store = InvoiceStore.new owner: NullOwner.new
  Capybara.app.invoice_store = @invoice_store

 end
