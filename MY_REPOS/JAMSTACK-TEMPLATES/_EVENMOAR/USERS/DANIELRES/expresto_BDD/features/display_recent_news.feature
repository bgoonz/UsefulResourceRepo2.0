Feature: display recent news

  In order to know what's new on expresto
  As a visitor
  I want to visit the homepage and read the recent news

  Background:
    Given languages: English, French
    And   these news:
      | author | status      | english_body               | french_body                         |
      | Daniel | published   | Expresto is online         | Expresto est en ligne               |
      | Daniel | published   | Added the news system      | Système de news ajouté              |
      | Daniel | unpublished | Unpublished                | Pas encore publié                   |

    And  I visit the homepage


  Scenario: See english published news on homepage
    When I set language to english

    Then I should see these contents:
      | content                             |
      | Expresto is online                  |
      | Added the news system               |

    And  I should not see these contents:
      | content                             |
      | Expresto est en ligne               |
      | Système de news ajouté              |
      | Unpublished                         |
      | Pas encore publié                   |


  Scenario: See french published news on homepage
    When I set language to french

    Then I should see these contents:
      | content                             |
      | Expresto est en ligne               |
      | Système de news ajouté              |

    And  I should not see these contents:
      | content                             |
      | Expresto is online                  |
      | Added the news system               |
      | Unpublished                         |
      | Pas encore publié                   |