# encoding: UTF-8
require_relative '../spec_helper'
require 'invoice_exhibit'

require 'capybara'

RSpec::Mocks::Mock.module_eval{
  def to_f   ; Float( 0 )    end
  def locale ; 'fake_locale' end
}

describe InvoiceExhibit do

  describe "instanciation" do
    let( :invoice ){ double  }
    it "creates an invoice exhibit from an invoice" do
      expect( InvoiceExhibit.new invoice ).to be_kind_of InvoiceExhibit
    end
  end


  describe "delegation" do
    let( :invoice ){ double  }
    let( :exhibit ){ InvoiceExhibit.new invoice }
    it "forwards unimplemented methods to the invoice object" do
      allow( invoice ).to receive( :unimplemented ){ 'response_from_invoice' }
      expect( exhibit.unimplemented ).to eq 'response_from_invoice'
    end
  end


  context "given an entry" do

    context "when entry description contains interpolations" do
      let( :invoice ){ double( number: 123, currency: 'euro',  entries: [ entry ] ).as_null_object }
      let( :entry   ){ double( name: 'working', hours: 3, desc:  '#{ entry.name } #{ entry.hours }h, invoice number: #{ number }' ) }
      it "resolves interpolations" do
        html = InvoiceExhibit.new( invoice ).to_html
        expect( html ).to include 'working 3h, invoice number: 123'
      end
    end
    context "when entry description is an array" do
      let( :entry   ){ double( desc:    ['line1','line2'] ).as_null_object }
      let( :invoice ){ double( entries: [ entry         ], currency: 'euro' ).as_null_object }
      it "turns it to multiline html using '<br />' elements" do
        html = InvoiceExhibit.new( invoice ).to_html
        expect( html ).to include 'line1<br />line2'
      end
    end

    describe "formatting price fields for display" do
      context "when in euros" do
        let( :invoice ){ double( ex_vat_total: 100, vat_total: 21, inc_vat_total: 121, currency: 'euro' ) }
        it "formats invoice prices as euros" do
          decorated_invoice = InvoiceExhibit.new( invoice )
          expect( decorated_invoice.ex_vat_total  ).to eq "€100.00"
          expect( decorated_invoice.vat_total     ).to eq "€21.00"
          expect( decorated_invoice.inc_vat_total ).to eq "€121.00"
        end
      end
      context "when in dollars" do
        let( :invoice ){ double( ex_vat_total: 100, vat_total: 21, inc_vat_total: 121, currency: 'dollar' ) }
        it "formats invoice prices as dollars" do
          decorated_invoice = InvoiceExhibit.new( invoice )
          expect( decorated_invoice.ex_vat_total  ).to eq "$100.00"
          expect( decorated_invoice.vat_total     ).to eq "$21.00"
          expect( decorated_invoice.inc_vat_total ).to eq "$121.00"
        end
      end

    end
  end


  describe "rendering an invoice with entries" do
    let( :exhibit ){ InvoiceExhibit.new invoice }
    let( :invoice ) do
      instance_double "Invoice",
      number: 2013001 , hourly_rate: 50     , vat: 21     , ex_vat_total: 1000 ,
      vat_total: 210  , inc_vat_total: 1210 , owner: jack , client: client     , currency: 'euro',
        entries: entries, emit_date: Time.parse("2013-08-05"), due_date:  Time.parse("2013-09-04")
    end
    let( :entries ) do
      [ double( 'entry1', name: 'Brogramming', hours: 3, desc: '' ),
        double( 'entry2', name: 'Drawing'    , hours: 5, desc: '' ) ]
    end
    let( :jack         ){ double owner_infos   }
    let( :client       ){ double client_infos }
    let( :owner_infos   ) do
        { name:  "Jname", address: "Jaddress", phone: "Jphone", email: "Jemail",
          vat_number: "Jvat_number", iban: "Jiban", bic: "Jbic", bank_address: "Jbank address" }
    end
    let( :client_infos ) do
        { first_name:   "David"      , last_name: "Wong",
          company_name: "ClientCorp" , address:   "David's address", vat_number: 'BE 44 55 66' }
    end

    it 'renders the invoice with entries as html' do
      html = Capybara.string exhibit.to_html
      expect( html ).to have_css '.invoice'
      expect( html ).to have_css '.entry', count: 2
    end
    describe 'rendered entries' do
      it 'show title and duration' do
        html = Capybara.string exhibit.to_html
        entry1_html = html.all('.entry').first
        entry2_html = html.all('.entry').last
        expect( entry1_html ).to have_content 'Brogramming'
        expect( entry1_html ).to have_content '3h'
        expect( entry2_html ).to have_content 'Drawing'
        expect( entry2_html ).to have_content '5h'
      end
    end
    describe 'invoice details' do
      let( :html ){ Capybara.string exhibit.to_html }
      it( "mentions the emit date"){ expect( html ).to have_content '05/08/2013'  }
      it( "mentions the due date" ){ expect( html ).to have_content '04/09/2013'  }
      it( "mentions the vat rate" ){ expect( html ).to have_content '21%'         }
      it( "mentions the ex vat total"  ){ expect( html ).to have_content '€1000'  }
      it( "mentions the vat total"     ){ expect( html ).to have_content '€210'   }
      it( "mentions the inc vat total" ){ expect( html ).to have_content '€1210'  }
      it( "displays the owner's business infos" ) do
        owner_infos.values.each { |owner_info|   expect( html ).to have_content owner_info }
      end
      it( "displays the client's business infos" ) do
        client_infos.values.each{ |client_info| expect( html ).to have_content client_info }
      end
    end

  end


end