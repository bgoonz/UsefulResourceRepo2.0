@links_to_activities
Feature: Links to activities

  Scenario: Viewing the list of activities on the main page
    Given activities: "work, play, sleep"
    When I visit the main page
    Then I should see a list of links to the activities: "work, play, sleep"
