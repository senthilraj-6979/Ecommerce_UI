@regression @loginPage
Feature: Login Page Functionality
    Scenario: Login Page Functionality
        Given User is on Amtrak Home page
        When Amtrak Home page should be loaded
        Then Click on the Sign In option
        Then User should be navigated to Sign In page
          