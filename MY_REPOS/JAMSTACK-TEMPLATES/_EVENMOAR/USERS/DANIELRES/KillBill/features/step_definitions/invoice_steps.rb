require_relative "../../models/invoice"
require_relative "../../models/invoice_store"
require 'ostruct'

FLOAT = Transform /^[0-9]*\.?[0-9]+$/ do |float|
  float.to_f
end

NUMBER = Transform /^[0-9]+$/ do |number|
  number.to_i
end

INVOICE = Transform /^invoice ([0-9]+)$/ do |number|
  @invoice_store.find( number.to_i ) || @invoice_store.new_invoice( number.to_i )
end

INVOICE_WITH_PARAMS = Transform /^invoice ([0-9]+) with (.*)$/ do |number, params|
  params = Hash[ params.split(', ').map{ |e| e.split(': ') } ]
  @invoice_store.new_invoice number.to_i,
              vat:         params["vat"].to_f,
              hourly_rate: params["hourly_rate"].to_f,
              emit_date:   params["emit_date"],
              locale:      params["locale"]
end

Given(/^an (#{INVOICE}|#{INVOICE_WITH_PARAMS})$/) do |invoice|
  invoice
end

Given(/^(\d+) invoices$/) do |qty|
  qty.times{ @invoice_store.new_invoice }
end

Given(/^an activity(?: "(.*)")? lasting (#{FLOAT}) hours added to (#{INVOICE})(?:, described as "(.*)")?/) do |name, hours, invoice, desc|
  invoice.add_entry OpenStruct.new( name: name, hours: hours, desc: desc )
end

Then(/^the total hours in (#{INVOICE}) should be (#{FLOAT})$/) do |invoice, total_hours|
  expect( invoice.total_hours ).to eq total_hours
end

Then(/^the total charged in (#{INVOICE}) without taxes should be (#{FLOAT})$/) do |invoice, amount|
  expect( invoice.ex_vat_total ).to eq amount
end

Then(/^the vat charged in (#{INVOICE}) should be (#{FLOAT})$/) do |invoice, amount|
  expect( invoice.vat_total ).to eq amount
end

Then(/^the total charged in (#{INVOICE}) with taxes should be (#{FLOAT})$/) do |invoice, amount|
  expect( invoice.inc_vat_total ).to eq amount
end

Given(/^an invoice (\d+) from Jack$/) do |number|
  jack = OpenStruct.new  name: "Jack's name",
                      address: "Jack's address",
                        phone: "Jack's phone",
                        email: "Jack's email",
                   vat_number: "Jack's vat_number",
                         iban: "Jack's iban",
                          bic: "Jack's bic",
                 bank_address: "Jack's bank address"
  @invoice_store.define_singleton_method( :owner ){ jack }
  @invoice_store.new_invoice number
end


Then(/^I should see Jack's business info: name, address, phone, email, VAT number, IBAN account, BIC, bank address$/) do
  jack_infos = [ "Jack's name"      , "Jack's address", "Jack's phone", "Jack's email",
                 "Jack's vat_number", "Jack's iban"   , "Jack's bic"  , "Jack's bank address" ]
  jack_infos.each do |info|
    expect( page ).to have_content info
  end
end

Given(/^an invoice (\d+) for "David Wong" from "ClientCorp" at "Business address" with vat number "(.*)"$/) do |number, vat_number|
  client = OpenStruct.new first_name: "David",
                           last_name: "Wong",
                        company_name: "ClientCorp",
                             address: "Business address",
                          vat_number: vat_number
  @invoice_store.new_invoice number, client: client
end
