import { Given, When, Then } from "@cucumber/cucumber";
import { PWWorld } from "../utilities/world";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";


Then('Click on the Sign In option', async function (this: PWWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.signInPopUp();
});

    Then('User should be navigated to Sign In page {string} and {string}', async function (this: PWWorld, email: string, password: string) {
           const loginPage = new LoginPage(this.page);
              await loginPage.enterCredentials(email, password);
              // Navigate back to homepage after login
              const homePage = new HomePage(this.page);
              await homePage.open();
              // Wait for page to be fully loaded and interactive
              await this.page.waitForLoadState('networkidle', { timeout: 60000 });
              await this.page.waitForTimeout(2000); // Additional buffer for any dynamic content
         });


