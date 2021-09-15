Feature: Index page

  As the author of the invoices
  I want to visit the index page
  In order to see the list of invoices already made

  Scenario: The author visits the index page and sees the list of invoices
    Given 3 invoices
    When  I am on the homepage
    Then  I should see 3 invoices

  Scenario: The author sees an invoice with basic details on the index page
    Given an invoice 2013003 with vat: 21, hourly_rate: 56, emit_date: 2013-08-05
    And   an activity lasting 10 hours added to invoice 2013003
    When  I am on the homepage
    Then  I should see 1 invoice
    And   I should see "2013003", "05/08/2013", "€560.00" within the invoice

  Scenario: Access an invoice from the index page
    Given an invoice 2013004
    And   an invoice 2013005
    When  I am on the homepage
    And   I follow "2013005"
    Then  I should see "2013005"
    But   I should not see "2013004"

  Scenario: Viewing index page with styling
    Given  I am on the homepage
    Then   the page should be styled
    When   I visit the main stylesheet url
    Then   I should see the stylesheet



