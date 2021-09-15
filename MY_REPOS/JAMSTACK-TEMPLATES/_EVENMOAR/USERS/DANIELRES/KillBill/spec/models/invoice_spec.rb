require_relative '../spec_helper'
require 'invoice'
require 'time'

describe Invoice do

  describe "#new" do
    it "creates an invoice, with a number attribute" do
      invoice = Invoice.new 123
      expect( invoice.number ).to eq 123
    end
    it "accepts a client as option parameter" do
      client  = double
      invoice = Invoice.new 123, client: client
      expect( invoice.client ).to be client
    end
    it "accepts an invoice store as option parameter" do
      store   = double
      invoice = Invoice.new 123, store: store
      expect( invoice.store ).to be store
    end
    it "accepts an emit date as option parameter" do
      invoice = Invoice.new 123, emit_date: "2013/02/01"
      expect( invoice.emit_date ).to eq Time.parse("2013/02/01")
    end

    it "sets now as emit date if none passed" do
      invoice = Invoice.new 123
      # 1 second tolerance:
      expect( invoice.emit_date ).to be_within( 1 ).of( Time.now )
    end

    it "delegates its owner to its store" do
      store   = double
      invoice = Invoice.new 123, store: store
      owner   = Object.new
      store.should_receive( :owner  ).and_return owner
      expect( invoice.owner ).to be owner
    end


    describe "with parameters" do
      invoice = Invoice.new 567, vat: 21, hourly_rate: 56
      it "accepts a value for vat" do
        expect( invoice.vat ).to eq 21
      end
      it "accepts a value for hourly_rate" do
        expect( invoice.hourly_rate ).to eq 56
      end
    end
  end

  describe "#add_entry" do
    it "accepts an object as an entry and adds it to the list of entries" do
      invoice = Invoice.new 123
      entry  = Object.new
      invoice.add_entry entry
      expect( invoice.entries ).to eq [ entry ]
    end
    it "accepts a hash as an entry" do
      invoice = Invoice.new 123
      entry  = { hours: 3, name: 'Brogramming' }
      invoice.add_entry entry
      expect( invoice.entries.first.name  ).to eq 'Brogramming'
      expect( invoice.entries.first.hours ).to eq 3
    end
    it "accepts a description for the entry" do
      invoice = Invoice.new 123
      entry  = { hours: 3, name: 'Brogramming', desc: 'Brogramming with fellow Bros' }
      invoice.add_entry entry
      expect( invoice.entries.first.desc ).to eq 'Brogramming with fellow Bros'
    end
  end

  describe "#total_hours" do
    let( :invoice ){ Invoice.new 123 }
    let( :entry1  ){ double hours: 3   }
    let( :entry2  ){ double hours: 5.1 }
    it "returns the total hours for the invoice with entries" do
      invoice.add_entry entry1
      invoice.add_entry entry2
      expect( invoice.total_hours ).to eq 8.1
    end
    it "returns 0 when no entries" do
      expect( invoice.total_hours ).to eq 0
    end
  end

  describe "#due_date" do
    let( :emit_date ){ Time.parse '2013-08-05' }
    let( :invoice   ){ Invoice.new 123 }
    it "returns a due date that is 30 days after the emit date" do
      invoice.stub emit_date: emit_date
      expect( invoice.due_date ).to eq Time.parse( '2013-09-04' )
    end
  end

  describe "#ex_vat_total" do
    let( :invoice ){ Invoice.new 123, hourly_rate: 56 }
    let( :entry1  ){ double hours: 3   }
    let( :entry2  ){ double hours: 5.1 }
    it "returns the total money charged for that invoice, without taxes" do
      invoice.add_entry entry1
      invoice.add_entry entry2
      expect( invoice.ex_vat_total ).to eq 453.60
    end
  end

  describe "#vat_total" do
    let( :invoice ){ Invoice.new 123, vat: 21, hourly_rate: 56 }
    let( :entry1  ){ double hours: 3   }
    let( :entry2  ){ double hours: 5.1 }
    it "returns the VAT amount for that invoice, rounded to the second decimal" do
      invoice.add_entry entry1
      invoice.add_entry entry2
      expect( invoice.vat_total ).to eq ( 453.60  * 21 / 100 ).round 2
    end
  end

  describe "#inc_vat_total" do
    let( :invoice ){ Invoice.new 123, vat: 21, hourly_rate: 56 }
    let( :entry1  ){ double hours: 3   }
    let( :entry2  ){ double hours: 5.1 }
    it "returns the total money charged for that invoice, with taxes" do
      invoice.add_entry entry1
      invoice.add_entry entry2
      expect( invoice.inc_vat_total ).to eq ( 453.60 + ( 453.60 * 21 / 100 ) ).round 2 # 548.86
    end
  end

  describe "setting the locale" do
    context "given a locale parameter" do
      it "set the locale accordingly" do
        invoice = Invoice.new 123, locale: 'loc'
        expect( invoice.locale ).to eq 'loc'
      end
    end
    context "given no locale parameter" do
      it "defaults to 'en'" do
        invoice = Invoice.new 123
        expect( invoice.locale ).to eq 'en'
      end
    end
  end

  describe "setting the currency" do
    context "given a currency parameter" do
      it "set the currency accordingly" do
        invoice = Invoice.new 123, currency: :bourzouf
        expect( invoice.currency ).to eq 'bourzouf'
      end
    end
    context "given no currency parameter" do
      it "defaults to euros" do
        invoice = Invoice.new 123
        expect( invoice.currency ).to eq 'euro'
      end
    end
  end

end