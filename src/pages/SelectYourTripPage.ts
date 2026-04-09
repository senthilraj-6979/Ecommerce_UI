import { Page,Locator,expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { config } from "../utilities/config"

export class SelectYourTripPage extends BasePage {
  readonly page: Page;
  readonly selectYourTrip  : Locator;



   constructor(page: Page) {
        super(page);
        this.page = page;
        this.selectYourTrip = page.getByRole('heading', { name: /Select Your Trip/i });
   }
   async assertLoaded() {
    // Wait for page to be fully loaded first
    await this.page.waitForLoadState('domcontentloaded');
    await this.selectYourTrip.waitFor({ state: 'visible', timeout: 60000 });
    await this.page.waitForTimeout(2000); // Wait for any animations or dynamic content to load
    await expect(this.selectYourTrip).toBeVisible();
   }
}
