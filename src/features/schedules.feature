@regression @schedules
Feature: Amtrak Home Page Schedule Functionality

  Scenario Outline: Amtrak Home Page Schedule Functionality
    Given User is on Amtrak Home page
    When Amtrak Home page should be loaded
    Then Click on the Schedules tab
    Then User should be navigated to Schedules page
    Then Click From Station "<orgcity>"
    Then Click To Station "<destcity>"
    Then Select schedule date "June",<{2026}>,<{1}>
    Then Click Find Schedules button
    Then Verify Available trips are displayed
    Then Scroll down to view train details
    Examples:
      | orgcity | destcity |
      | WAS     | WIL      |


@regression @trainSchedules
  Scenario: Amtrak Home Page Schedule search by dropdown functionality
    Given User is on Amtrak Home page
    When Amtrak Home page should be loaded
    Then Click on the Schedules tab
    Then Click search by dropdown
    Then Select Route option in search by dropdown
   
