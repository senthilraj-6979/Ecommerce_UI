import { Given, When, Then } from "@cucumber/cucumber";
import { PWWorld } from "../utilities/world";
import { LoginPage } from "../pages/LoginPage";




// Reuse the shared Home page step definitions from `HomePage.Steps.ts`.
// Do not duplicate the Given/When steps for navigating to the Home page
// — Cucumber will match the definitions from the shared file.

Then('Click on the Sign In option', async function (this: PWWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.signInPopUp();
});

    Then('User should be navigated to Sign In page', function () {
           // Write code here that turns the phrase above into concrete actions
         
         });