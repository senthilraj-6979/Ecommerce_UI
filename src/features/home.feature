@regression @E2EBooking
Feature: Amtrak Home Page Search Functionality

  Scenario Outline: Home page Search without Login
    Given User is on Amtrak Home page
    When Amtrak Home page should be loaded
    Then Click on the Book with Points option
    Then Click one way dropdown
    Then Select one way dropdown option
    Then Click From and enter origin "<orgcity>"
    Then Click To and enter destination "<destcity>"
   # Then Click Depart and select departure date
  # Then Select departure date <3> days from current date
   Then Select departure date 12 in "May" 2026
    Then Click Find Trains button
    Then Verify Select Your Trip are displayed
    Examples:
      | orgcity | destcity |
      | WAS     | WIL      |


# @loginPageE2E
# Scenario Outline: Home page Search with Login
#   Given User is on Amtrak Home page
#   When Amtrak Home page should be loaded
#   Then Click on the Sign In option
#   Then User should be navigated to Sign In page "<email>" and "<password>"
#   Then Amtrak Home page should be loaded
#   Then Click one way dropdown
#   Then Select one way dropdown option
#   Then Click From and enter origin "<orgcity>"
#   Then Click To and enter destination "<destcity>"
#   Then Click Depart and select departure date
#   Then Click Find Trains button
#   Then Verify Select Your Trip are displayed
#  Examples:
#     | orgcity | destcity |  email                 | password       |
#     | WAS     | WIL      | trsenthilraj@gmail.com | Kavineesh123$ |




