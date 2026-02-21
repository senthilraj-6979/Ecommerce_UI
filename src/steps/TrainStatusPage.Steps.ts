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

Then('Click From and enter departure {string}', async function (this: PWWorld, departureStation: string) {
    // Write code here that turns the phrase above into concrete actions
    const trainStatus = new TrainStatusPage(this.page);
    await trainStatus.enterDepartureStation(departureStation);
});




Then('Click To and enter arrival station {string}', async function (this: PWWorld, arrivalStation: string) {

    const trainStatus = new TrainStatusPage(this.page);
    await trainStatus.enterArrivalStation(arrivalStation);
});

Then('Click calender and select date {string} days from current date', async function (this: PWWorld, dayOffset: string) {
    const trainStatus = new TrainStatusPage(this.page);
    await trainStatus.selectDate(parseInt(dayOffset));
});

Then('Click Check Trains Status button', async function (this: PWWorld) {
    const trainStatus = new TrainStatusPage(this.page);
    await trainStatus.clickCheckStatusButton();
});



Then('Scroll down to view train status details', async function (this: PWWorld) {
    const trainStatus = new TrainStatusPage(this.page);
    await trainStatus.scrollToTrainStatusDetails();
});