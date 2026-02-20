import { Page, Locator, expect } from "@playwright/test";
import { count } from "console";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly signPopup: Locator;
  readonly signInLink: Locator;
  readonly popupWrapper: Locator;
  readonly popupArrow: Locator;


   constructor(page: Page) {
        super(page);
        this.page = page;
        this.signPopup = page.locator('.agr-popup-content');
        this.popupWrapper = page.locator('.agr-popup-wrapper');
        this.popupArrow = page.locator('.popup-arrow');
        this.signInLink = page.getByRole('link', { name: 'Sign In' });
        
   }

  async signInPopUp() {
    await this.signPopup.waitFor({ state: 'visible', timeout: 50000 });
  //  await expect(this.signPopup).toBeVisible({ timeout: 50000 });
   await this.signInLink.dblclick();
 //  await this.page.waitForLoadState('domcontentloaded');
  await this.signInLink.click();
  }


}