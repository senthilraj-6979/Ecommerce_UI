import { Given, When, Then } from "@cucumber/cucumber";
import { PWWorld } from "../utilities/world";
import { HomePage } from "../pages/HomePage";
import { TrainStatusPage } from "../pages/TrainStatusPage";
import { config } from "../utilities/config";


// Reuse the shared Home page step definitions from `HomePage.Steps.ts`.
// Do not duplicate the Given/When steps for navigating to the Home page
// — Cucumber will match the definitions from the shared file.

Then('Click on the Train Status option', async function (this: PWWorld) {
  const trainStatus = new TrainStatusPage(this.page);
  await trainStatus.clickTrainStatusTab();
});

Then('User should be navigated to Train Status page', async function (this: PWWorld) {
  const trainStatus = new TrainStatusPage(this.page);
  await trainStatus.assertLoaded();
});


