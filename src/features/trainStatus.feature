@regression @trainStatus
Feature: Train Status Functionality

Scenario: Train Status Functionality
  Given User is on Amtrak Home page
  When Amtrak Home page should be loaded
  Then Click on the Train Status option
  Then User should be navigated to Train Status page
  Then Click From and enter departure "WAS"
  Then Click To and enter arrival station "WIL"
  Then Click calender and select date "2" days from current date
  Then Click Check Trains Status button
  Then Scroll down to view train status details
