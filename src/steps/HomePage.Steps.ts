import { Given, Then } from "@cucumber/cucumber";
import { PWWorld } from "../utilities/world";
import { HomePage } from "../pages/homePage";



Given('user is on Amtrak Home page', async function (this: PWWorld) {
  const home = new HomePage(this.page); // should now be defined
  await home.open();
});


Then("Amtrak Home page should be loaded", async function (this: PWWorld) {
//   const home = new HomePage(this.page);
//  await home.assertLoaded();
});


