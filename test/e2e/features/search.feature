Feature: Search

Search Duck Duck Go

  Scenario: Search for Page Object Pattern

    Given the user has loaded "duckduckgo.com"
    When the user searches for "Page object pattern"
    Then the will see results like the following
      | title | summary |
      |       |         |

