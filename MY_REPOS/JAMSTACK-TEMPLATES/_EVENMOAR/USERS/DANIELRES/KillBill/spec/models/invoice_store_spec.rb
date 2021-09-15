require_relative '../spec_helper'
require 'invoice_store'



describe InvoiceStore do

  before( :each ) do
    class_double( "Invoice" ).as_stubbed_const
    Invoice.stub(:new).and_return( Object.new )
  end
  let( :store   ){ InvoiceStore.new  }

  describe "#new" do
    it "creates an new invoice store" do
      store =  InvoiceStore.new
      expect( store ).to be_kind_of InvoiceStore
    end
    it "accepts an owner as parameter" do
      owner = Object.new
      store = InvoiceStore.new owner: owner
      expect( store.owner ).to be owner
    end
  end

  describe "#new_invoice" do
    it "returns a new invoice" do
      Invoice.should_receive( :new )
      store.new_invoice
    end
    it "accepts a number for the invoice as parameter" do
      Invoice.should_receive( :new ).with 10, anything
      store.new_invoice 10
    end
    it "increments the number if none specified, for each new invoice" do
      store.new_invoice.stub number: 10
      Invoice.should_receive( :new ).with 11, anything
      store.new_invoice
    end
    it "sets the invoice store reference to itself" do
      Invoice.should_receive( :new ).with anything, store: store
      store.new_invoice
    end
    it "accepts passing options without specifying a first argument for invoice number" do
      Invoice.should_receive( :new ).with anything, { foo: 'foo', bar: 'bar', store: store }
      store.new_invoice foo: 'foo', bar: 'bar'
    end
  end

  describe "#entries" do
    let( :invoice1 ){ store.new_invoice }
    let( :invoice2 ){ store.new_invoice }
    it "returns the list of invoices" do
      expect( store.entries ).to match_array [ invoice1, invoice2 ]
    end
  end

  describe "#find" do
    it "finds an invoice by its number" do
      invoice = store.new_invoice
      invoice.stub number: 5
      expect( store.find 5 ).to be invoice
    end
  end

  it "refuses to create an invoice with an already taken number" do
    invoice = store.new_invoice
    invoice.stub number: 15
    expect{ store.new_invoice 15 }.to raise_error StandardError
    expect{ store.new_invoice 16 }.not_to raise_error
  end

end