@speakers
Feature: Speakers
  In order to have speakers on my website
  As an administrator
  I want to manage speakers

  Background:
    Given I am a logged in refinery user
    And I have no speakers

  @speakers-list @list
  Scenario: Speakers List
   Given I have speakers titled UniqueTitleOne, UniqueTitleTwo
   When I go to the list of speakers
   Then I should see "UniqueTitleOne"
   And I should see "UniqueTitleTwo"

  @speakers-valid @valid
  Scenario: Create Valid Speaker
    When I go to the list of speakers
    And I follow "Add New Speaker"
    And I fill in "Firstname" with "This is a test of the first string field"
    And I press "Save"
    Then I should see "'This is a test of the first string field' was successfully added."
    And I should have 1 speaker

  @speakers-invalid @invalid
  Scenario: Create Invalid Speaker (without firstname)
    When I go to the list of speakers
    And I follow "Add New Speaker"
    And I press "Save"
    Then I should see "Firstname can't be blank"
    And I should have 0 speakers

  @speakers-edit @edit
  Scenario: Edit Existing Speaker
    Given I have speakers titled "A firstname"
    When I go to the list of speakers
    And I follow "Edit this speaker" within ".actions"
    Then I fill in "Firstname" with "A different firstname"
    And I press "Save"
    Then I should see "'A different firstname' was successfully updated."
    And I should be on the list of speakers
    And I should not see "A firstname"

  @speakers-duplicate @duplicate
  Scenario: Create Duplicate Speaker
    Given I only have speakers titled UniqueTitleOne, UniqueTitleTwo
    When I go to the list of speakers
    And I follow "Add New Speaker"
    And I fill in "Firstname" with "UniqueTitleTwo"
    And I press "Save"
    Then I should see "There were problems"
    And I should have 2 speakers

  @speakers-delete @delete
  Scenario: Delete Speaker
    Given I only have speakers titled UniqueTitleOne
    When I go to the list of speakers
    And I follow "Remove this speaker forever"
    Then I should see "'UniqueTitleOne' was successfully removed."
    And I should have 0 speakers
 