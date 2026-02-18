import { Locator, Page } from 'playwright';
import { expect } from '@playwright/test';

import { BasePage } from './BasePage';


export class FooterPage extends BasePage {

  readonly page: Page;
  readonly header: Locator;
  readonly footerSection: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
     this.header = this.page.getByRole('banner');
    this.footerSection = this.page.locator('.footer-list a');
   
  }
  async footerSectionLinks() {
 
    const links = await this.page.locator('.footer-list a').all();
// Click each link
for (const link of links) {
    const linkCount = await this.footerSection.count();
    console.log(`links name: ${await link.innerText()}`);
 
    await link.click();
    // Optional: navigate back or handle new tabs
     await this.page.waitForTimeout(15000);
    await this.page.goBack();
}

    await this.footerSection.click();
  }     
}
