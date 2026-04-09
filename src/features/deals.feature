@regression @deals
Feature: Amtrak Deals Page Functionality

  Scenario Outline: Deals page 
    Given User is on Amtrak Home page
    When Amtrak Home page should be loaded
    Then Click on the Deals option
    Then Amtrak Deals page should be loaded
    Then Click on the "<Deals>" and Verify 
    Examples:
      |Deals| 
      |Night Owl Fares|
      |Share Fares|
      |See current promotions|  
      |Child Discounts|
      |Senior Discounts|
      |Student Discounts|
      |See all discounts|
      |Amtrak Vacations|
      |Train Tour Packages|
      |Family Trip by Train|
      |More getaways and journeys|
      |Multi-Ride Pass|
      |USA Rail Pass|
      |California Rail Pass|
      |RideReserve|
      |About rail passes|