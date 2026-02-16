import { Locator, Page } from 'playwright';
import { expect } from '@playwright/test';

import { BasePage } from './BasePage';
import { HomePage } from './HomePage';

export class TrainStatusPage extends BasePage {
  
  readonly page: Page;
  readonly trainStatusTab: Locator;
  readonly header: Locator;
  readonly oneWayDropdown: Locator;
  readonly acceptCookie: Locator;



  constructor(page: Page) {
    super(page);
    this.page = page;
    this.trainStatusTab = page.getByRole('tab', { name: 'TRAIN STATUS' });
     this.header = this.page.getByRole('banner');
    this.oneWayDropdown = this.page.getByRole('button', { name: 'Trip Type:One-Way' });
    this.acceptCookie = page.getByRole('button', { name: 'Allow All' });
   
  }




   async clickTrainStatusTab() {
      await this.trainStatusTab.click();
  }

  async assertLoaded() {
    await expect(this.header).toBeVisible();
  }



}

