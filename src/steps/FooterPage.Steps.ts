import { Given, When, Then } from "@cucumber/cucumber";
import { PWWorld } from "../utilities/world";
import { FooterPage } from "../pages/FooterPage";




// Reuse the shared Home page step definitions from `HomePage.Steps.ts`.
// Do not duplicate the Given/When steps for navigating to the Home page
// — Cucumber will match the definitions from the shared file.

Then('Scroll down to the footer section', async function (this: PWWorld) {
    const footerPage = new FooterPage(this.page);
    await footerPage.footerSectionLinks();
});
