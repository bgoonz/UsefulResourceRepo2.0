Feature: Invoice page

  As the author of the invoices
  I want to visit an invoice page
  In order to see the complete invoice

  Scenario: The author visits the page of an invoice and reads all its details
    Given an invoice 2013003 with vat: 21, hourly_rate: 56, emit_date: 2013-08-05
    And   an activity "Brogramming" lasting 10 hours added to invoice 2013003
    When  I am on the invoice 2013003 page
    And   I should see "2013003", "05/08/2013", "04/09/2013", "€560.00", "Brogramming", "10h", "€56.00", "€117.60", "677.60" within the invoice


  Scenario: A user visits the page of an invoice and sees the business infos of the owner
    Given an invoice 2013001 from Jack
    When  I am on the invoice 2013001 page
    Then  I should see Jack's business info: name, address, phone, email, VAT number, IBAN account, BIC, bank address


  Scenario: A user visits the page of an invoice and sees the business infos of the client
    Given an invoice 2013001 for "David Wong" from "ClientCorp" at "Business address" with vat number "BE 11 22 33"
    When  I am on the invoice 2013001 page
    Then  I should see "David", "Wong", "ClientCorp", "Business address", "BE 11 22 33"  within the invoice

  Scenario: A user visits the page of an invoice and sees the line items with their descriptions
    Given an invoice 2013001
    And   an activity "Brogramming" lasting 10 hours added to invoice 2013001, described as "Brogramming gangsta style"
    When  I am on the invoice 2013001 page
    Then  I should see "Brogramming", "Brogramming gangsta style" within the invoice

  Scenario: Viewing an english invoice
    Given an invoice 2013005 with locale: en, vat: 21, hourly_rate: 56, emit_date: 2013-08-05
    When  I am on the invoice 2013005 page
    Then  I should see "Invoice", "05/08/2013" within the invoice

  Scenario: Viewing a french invoice
    Given an invoice 2013006 with locale: fr, vat: 21, hourly_rate: 56, emit_date: 2013-08-05
    When  I am on the invoice 2013006 page
    Then  I should see "Facture", "05/08/2013" within the invoice

