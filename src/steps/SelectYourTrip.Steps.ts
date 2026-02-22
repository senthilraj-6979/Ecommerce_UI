
import { Given, When, Then } from "@cucumber/cucumber";
import { PWWorld } from "../utilities/world";
import { HomePage } from "../pages/HomePage";
import { TrainStatusPage } from "../pages/TrainStatusPage";
import { config } from "../utilities/config";
import { SelectYourTripPage } from "../pages/SelectYourTripPage";
  
  Then('Verify Select Your Trip are displayed', function () {
    const selectYourTrip = new SelectYourTripPage(this.page);
    return selectYourTrip.assertLoaded();
         });