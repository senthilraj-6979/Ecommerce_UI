import { Page, Locator, expect } from "@playwright/test";
import { count } from "console";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly signPopup: Locator;
  readonly signInLink: Locator;
  readonly popupWrapper: Locator;
  readonly popupArrow: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;


   constructor(page: Page) {
        super(page);
        this.page = page;
        this.signPopup = page.locator('.agr-popup-content');
        this.popupWrapper = page.locator('.agr-popup-wrapper');
        this.popupArrow = page.locator('.popup-arrow');
        this.signInLink = page.getByRole('link', { name: 'Sign In' });
        this.emailInput = page.getByRole('textbox', { name: 'Email or Guest Rewards #' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'SIGN IN' });
   }

  async signInPopUp() {
    await this.signPopup.waitFor({ state: 'visible', timeout: 50000 });
    await this.page.waitForTimeout(2000); // Wait for popup animations
    
    // Now the Sign In link should be accessible
    await this.signInLink.click();
    await this.page.waitForLoadState('load');
  }

  async enterCredentials(email: string, password: string) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    // Wait for login to process
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(10000); // Give time for redirect/processing
  }


}