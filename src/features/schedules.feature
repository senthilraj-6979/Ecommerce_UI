@regression @schedules
Feature: Amtrak Home Page Schedule Functionality

  Scenario Outline: Amtrak Home Page Schedule Functionality
    Given User is on Amtrak Home page
    When Amtrak Home page should be loaded
    Then Click on the Schedules tab
    Then User should be navigated to Schedules page
    Then Click From Station "<orgcity>"
    Then Click To Station "<destcity>"
    Then Select schedule date
    Then Click Find Schedules button
   # Then Verify Schedule results are displayed      
    Examples:
      | orgcity | destcity |
      | WAS     | WIL      |