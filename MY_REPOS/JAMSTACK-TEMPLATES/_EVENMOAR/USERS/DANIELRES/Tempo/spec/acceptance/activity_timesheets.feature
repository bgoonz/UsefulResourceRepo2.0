@display_an_activity
Feature: Activity timesheets

  # Scenario: Viewing the activity timesheets
  #   Given an activity "swimming" that was practiced during 3 months
  #   When  I visit the activity page
  #   Then  I should see 3 timesheets

  Scenario: Viewing the details of a timesheet
    Given an activity practiced regularly during 1 month
    When  I visit the activity page
    Then  I should see the timesheet with its facts