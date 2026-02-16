import { Given, Then, When } from "@cucumber/cucumber";
import { PWWorld } from "../utilities/world";
import { HomePage } from "../pages/HomePage";



Given('User is on Amtrak Home page', async function (this: PWWorld) {
  const home = new HomePage(this.page); // should now be defined
  await home.open();
});


When("Amtrak Home page should be loaded", async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.assertLoaded();
});

Then("Click on the Book with Points option", async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.clickBookWithPoints();
});


Then("Click one way dropdown", async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.clickOneWayDropdown();
});

Then('Select one way dropdown option', async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.clickOneWayOption();
});


Then('Click From and enter origin {string}', async function (this: PWWorld, orgcity: string) {
  const home = new HomePage(this.page);
  await home.enterOriginCity(orgcity);
});
       


Then('Click To and enter destination {string}', async function (this: PWWorld, destcity: string) {
  const home = new HomePage(this.page);
  await home.enterDestinationCity(destcity);

});
       

Then('Click Depart and select departure date', async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.clickDepartDate();
});
       


Then('Click Find Trains button', async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.clickFindTrains();
});