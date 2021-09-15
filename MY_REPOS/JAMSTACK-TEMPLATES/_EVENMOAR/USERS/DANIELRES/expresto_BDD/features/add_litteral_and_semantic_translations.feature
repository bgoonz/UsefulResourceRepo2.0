Feature: Add litteral and semantic translations

  As a registered user
  I want to add litteral and semantic translations to an expression
  In order to allow people to discover these expressions through their translations

  Background:
    Given languages: French, English
    And   a french expression "C'est le bouquet"
    And   I am logged in
    And   I visit the expression

  Scenario: Visit the original expression
    Then I should see "C'est le bouquet"

  Scenario: Add a translation
    When I add my english translation "That's the bouquet" that means "I can't stand it anymore"
    Then I should see "C'est le bouquet"
    And  I should see "That's the bouquet"
    And  I should see "I can't stand it anymore"
