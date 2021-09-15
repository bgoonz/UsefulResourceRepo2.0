Feature: add an expression

  As a registered user
  I want to add an idiomatic expression
  In order to share it with the world

  Background:
    Given I am logged in
    And   I added my expression

  Scenario: See my expression and its details
    Then  I should see my expression and its details

  Scenario: See a link to my expression on my public profile
    When  I visit my public profile
    Then  I should see a link to my expression


  Scenario: Attempt to add an expression when not logged in
    Given I am not logged in
    Then  I should see how to log in

    When  I attempt to add an expression
    Then  I should see an obvious way to log in
