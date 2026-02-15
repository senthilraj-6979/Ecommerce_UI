// import { Given, When, Then } from "@cucumber/cucumber";
// import { PWWorld } from "../utilities/world";
// import { HomePage } from "../pages/homePage";
// import { TrainStatusPage } from "../pages/trainStatusPage";
// import { config } from "../utilities/config";

// When("user navigates to Train Status page", async function (this: PWWorld) {
//   const home = new HomePage(this.page);
//   await home.goToTrainStatus();
// });

// Then("Train Status page should be loaded", async function (this: PWWorld) {
//   const status = new TrainStatusPage(this.page);
//   await status.assertLoaded();
// });

// Given("user is on Train Status page", async function (this: PWWorld) {
//   const status = new TrainStatusPage(this.page);
//   // If you know the exact URL for Train Status on your run, put it here.
//   // Example (placeholder): await status.goto(`${config.baseURL}/train-status`);
//   await status.goto(config.baseURL); // fallback: update to actual train status URL
//   await status.assertLoaded();
// });

// When("user searches train status for train number {string}", async function (this: PWWorld, trainNo: string) {
//   const status = new TrainStatusPage(this.page);
//   await status.searchByTrainNumber(trainNo);
// });

// Then("train status results should be displayed", async function (this: PWWorld) {
//   const status = new TrainStatusPage(this.page);
//   await status.assertResultsShown();
// });

