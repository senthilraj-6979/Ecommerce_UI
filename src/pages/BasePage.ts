import { Page, Locator } from "playwright";

import { expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async waitVisible(locator: Locator, timeout = 15_000) {
    await expect(locator).toBeVisible({ timeout });
  }

  async acceptCookiesIfPresent() {
    const acceptBtn = this.page.getByRole("button", { name: /accept|agree|ok/i }).first();
    if (await acceptBtn.isVisible().catch(() => false)) {
      await acceptBtn.click().catch(() => {});
    }
  }
  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }



}

