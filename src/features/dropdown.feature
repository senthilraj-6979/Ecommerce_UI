@dropdown
Feature: Drop down Functionality

  Scenario: Verify dropdown functionality on Home page
    Given User is on dropdown Home page
    When Verify dropdown should be loaded
    Then Click on the dropdown option
    Then Click select friend dropdown
    Then select "Matt" as friend
    Then Click country dropdown
    Then select "United States" as country

    Then Click skill dropdown
    Then select "California" as state

    Then Click Language dropdown
    Then Enter "English" as language
 
    # Then select "CSS" as skill
    # Then select "HTML" as skill
    # Then select "Ember" as skill
   #  Then select "California" as state
 
    # Then Click state dropdown
    # Then select "California" as state

