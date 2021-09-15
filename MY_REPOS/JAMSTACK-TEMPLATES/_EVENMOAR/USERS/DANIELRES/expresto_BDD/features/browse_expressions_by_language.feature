
Feature: browse expressions by language

  As a simple visitor
  I want to browse expressions in different languages
  In order to discover cool expressions from various cultures

  Background:
    Given 2 english expression
    And   3 french expressions
    And   I visit the expressions page

  Scenario: set language to English and see english expressions
    When I set language to English
    Then I should see "2 expressions in english"

  Scenario: set language to French and see french expressions
    When I set language to French
    Then I should see "3 expressions en français"
