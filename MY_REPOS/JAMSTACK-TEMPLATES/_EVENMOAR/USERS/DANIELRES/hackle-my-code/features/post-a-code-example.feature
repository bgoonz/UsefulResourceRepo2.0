Feature: post a code example

  In order to learn how I can improve a code example
  As an user
  I want to post a code example

  Scenario: Add a cucumber story

    Given I am on the homepage
    When  I submit my cucumber story
    And   I go back to the homepage
    Then  I should see my cucumber story
