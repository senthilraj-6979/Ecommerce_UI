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



Then('Select departure date <{int}> days from current date', async function (this: PWWorld, day: number) {
  const home = new HomePage(this.page);
  await home.selectDepartureDate(day);
});



         Then('Select departure date {string} in {string} {string}', function (string, string2, string3) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
Then('Select departure date {int} in {string} {int}', async function (this: PWWorld, day: number, month: string, year: number) {
  const home = new HomePage(this.page);
  await home.selectDepartureDate(day, month, year);
});



Then('Click Find Trains button', async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.clickFindTrains();
});