@regression @deals
Feature: Amtrak Deals Page Functionality

  Scenario Outline: Deals page 
    Given User is on Amtrak Home page
    When Amtrak Home page should be loaded
    Then Click on the Deals option
    Then Amtrak Deals page should be loaded
    Then Click on the "<Deals>" and Verify 
      Then Click on the Deals option          
   # Then Verify the deal details page is displayed 
    Examples:
      |Deals| 
      |Night Owl Fares|
      |Share Fares|
      |See current promotions|  
        
