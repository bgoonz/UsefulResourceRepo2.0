Feature: manage expressions

  As an administrator
  I want to be able to edit and remove expressions
  In order to fix errors and remove unappropriate content

  Background:
    Given these expressions:
      | text                       |
      | Unappropriate expression.  |
      | Expression with typpo.     |
    And   I visit the homepage


  Scenario: Remove an expression as an administrator
    Given I am logged in as an administrator
    Then  I should see these contents:
      | content                    |
      | Unappropriate expression.  |
      | Expression with typpo.     |

    When  I click on "Unappropriate expression."
    And   I click on the "destroy-expression" link
    Then  I should not see "Unappropriate expression."


  Scenario: Edit an expression as an administrator
    Given I am logged in as an administrator
    Then  I should see these contents:
      | content                    |
      | Unappropriate expression.  |
      | Expression with typpo.     |

    When  I click on "Expression with typpo."
    And   I click on the "update-expression" link
    And   I fill in "expression_body" with "Expression without typo."
    And   I click on "Update Expression"
    Then  I should see "Expression without typo."


  Scenario: Attempt to edit and remove an expression while not an administrator
    When  I click on "Unappropriate expression."
    Then  I should not see a "destroy-expression" link
    And   I should not see a "update-expression" link