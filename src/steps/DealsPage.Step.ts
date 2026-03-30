import { Given, When, Then } from "@cucumber/cucumber";
import { PWWorld } from "../utilities/world";
import { DealsPage } from "../pages/DealsPage";
import { config } from "../utilities/config";


// Reuse the shared Home page step definitions from `HomePage.Steps.ts`.
// Do not duplicate the Given/When steps for navigating to the Home page
// — Cucumber will match the definitions from the shared file.

Then('Click on the Deals option', async function (this: PWWorld) {
    const dealsPage = new DealsPage(this.page);
    await dealsPage.clickDealsTab();
});


Then('Amtrak Deals page should be loaded', async function (this: PWWorld) {
    const dealsPage = new DealsPage(this.page);
    await dealsPage.verifyDealsPage();
});

Then('Click on the {string} and Verify', async function (this: PWWorld, linkText: string) {
    const dealsPage = new DealsPage(this.page);
    await dealsPage.validateDealsLinkPresence(linkText);
});
