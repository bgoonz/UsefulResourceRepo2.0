Feature: Correct own expressions

  As a registered user
  I should be able to edit and remove my expressions during a limited time period
  In order to correct my errors myself

  Background:
    Given I am logged in
    And   my expressions are:
      | text          |
      | Correct one.  |
      | Wrong one.    |
      | With a typpo. |
    And   I visit the homepage

  Scenario: Remove own expression
    When I click on "Wrong one."
    And  I click on the "destroy-expression" link
    Then I should see "Correct one."
    But  I should not see "Wrong one."

  Scenario: Edit own expression
    When I change the expression "With a typpo." to "Without any typo."
    Then I should see "Without any typo."
    And  I should see "Correct one."
