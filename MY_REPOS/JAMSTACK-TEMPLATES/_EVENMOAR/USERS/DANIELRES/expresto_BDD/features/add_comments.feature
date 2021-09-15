Feature: add comments

  As a registered user
  I want to add comments to expressions
  In order to interact with other users

  Background:
    Given 1 expression
    Given I am logged in
    When  I add a comment to the expression

  Scenario: See my comment along the expression
    When  I visit the expression
    Then  I should see my comment

  Scenario: See my comment on homepage
    When  I visit the homepage
    Then  I should see my comment

  Scenario: See my comment on my public profile
    When  I visit my public profile
    Then  I should see my comment


  Scenario: Attempt to add a comment to an expression when not logged in
    Given I am not logged in

    When  I visit the expression
    Then  I should see a suggestion to login to comment