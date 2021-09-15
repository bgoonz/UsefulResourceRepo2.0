Feature: Generate an invoice with activities and totals


  As a freelance
  I want to create an invoice with activities and totals
  In order to charge for my services


  Background:

  Scenario: A user reads the total hours worked on an invoice with two activities
    Given an invoice 12
    And   an activity lasting 32.5 hours added to invoice 12
    And   an activity lasting 11.1 hours added to invoice 12
    Then  the total hours in invoice 12 should be 43.6

  Scenario: A user reads how much he is charged, without and with VAT
    Given an invoice 12 with vat: 21, hourly_rate: 56
    And   an activity lasting 2 hours added to invoice 12
    And   an activity lasting 3.1 hours added to invoice 12
    Then  the total charged in invoice 12 without taxes should be 285.60
    And   the vat charged in invoice 12 should be 59.98
    And   the total charged in invoice 12 with taxes should be 345.58
