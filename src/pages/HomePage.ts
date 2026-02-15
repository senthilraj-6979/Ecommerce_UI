import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly header: Locator;


  constructor(page: Page) {
  if (!page) throw new Error('HomePage: page is undefined (check Cucumber Before hook / World)');
    this.page = page;

    // ✅ define locators AFTER page assignment
    this.header = this.page.getByRole('banner');
  }
  
  
  async open() {
    await this.page.goto("https://www.amtrak.com/home", { waitUntil: "domcontentloaded" });
  }


  
  async assertLoaded() {
    await expect(this.header).toBeVisible();
  }
}
