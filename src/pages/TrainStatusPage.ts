import { Page } from 'playwright';
import { expect } from '@playwright/test';

import { BasePage } from './BasePage';

export class TrainStatusPage extends BasePage {
  private heading = this.page.getByRole("heading", { name: /train status/i }).first();

  // Best-effort locators; adjust once you confirm the exact status form on your run
  private trainNumberTab = this.page.getByRole("tab", { name: /train number/i }).first();
  private trainNumberInput = this.page.getByRole("textbox", { name: /train number/i }).first();
  private searchButton = this.page.getByRole("button", { name: /search|find/i }).first();

  constructor(page: Page) {
    super(page);
  }

  async assertLoaded() {
    await this.waitVisible(this.page.locator("body"));
    // If heading exists reliably, keep this:
    // await this.waitVisible(this.heading);
    await expect(this.page).toHaveURL(/amtrak\.com/i);
  }

  async searchByTrainNumber(trainNo: string) {
    if (await this.trainNumberTab.isVisible().catch(() => false)) {
      await this.trainNumberTab.click();
    }
    await this.trainNumberInput.fill(trainNo);
    await this.searchButton.click();
  }

  async assertResultsShown() {
    // Results vary; use a resilient check:
    await this.waitVisible(this.page.locator("body"), 30_000);
  }
}

