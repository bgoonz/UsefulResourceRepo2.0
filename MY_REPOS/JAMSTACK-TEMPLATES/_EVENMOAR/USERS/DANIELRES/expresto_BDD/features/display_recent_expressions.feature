Feature: recent expressions on homepage

  As a visitor
  I want to browse recent expressions from the homepage
  In order to discover the latest expressions

  Background:
    Given 2 english expressions by Mike
    And   3 french expressions by Mike
    And   I visit the homepage

  Scenario: See most recent expressions on homepage
    Then I should see "Most recent expressions in"
    And  I should see a link list with 2 expressions in English

    When I set language to french
    Then I should see "Dernières expressions ajoutées"
    And  I should see a link list with 3 expressions in French

  Scenario: Display expressions details
    When I click on the first expression
    Then I should see the expression page with details and Mike as author


