Feature: browse expressions by an author

  As a visitor
  I want to see a list of expressions by an author on his public profile
  In order to discover more expressions by this author

  Background:
    Given 2 english expressions by John
    And   3 french  expressions by John

  Scenario: Visit an author's public profile
    When I visit John's page
    Then I should see 2 english expressions
    And  I should see 3 french expressions