import { Locator, Page } from 'playwright';
import { expect } from '@playwright/test';

import { BasePage } from './BasePage';
import { HomePage } from './HomePage';

export class TrainStatusPage extends BasePage {

  readonly page: Page;
  readonly trainStatusTab: Locator;
  readonly header: Locator;
  readonly departureStation: Locator;
  readonly arrivalStation: Locator;
  readonly selectCalendar: Locator;
  readonly checkStatusBtn: Locator;
  readonly month: Locator;
  readonly resultsLocator: Locator;
  readonly showResults: Locator;
  readonly noOfPages: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.trainStatusTab = page.getByRole('tab', { name: 'TRAIN STATUS' });
    this.header = this.page.getByRole('banner');
    this.departureStation = this.page.getByRole('combobox', { name: 'departure station' });
    this.arrivalStation = this.page.getByRole('combobox', { name: 'To staion' });
    this.selectCalendar = this.page.locator('.mx-2.selected-date1');
    this.month = this.page.locator('.ngb-dp-month-name');
    this.checkStatusBtn = this.page.getByRole('button', { name: 'CHECK STATUS' });
    this.resultsLocator = this.page.getByRole('heading', { name: 'Train Status' });
    this.showResults = this.page.locator('.paginator__result-text');
    this.noOfPages = this.page.locator('.pagination-page.page-item');
  }


  async clickTrainStatusTab() {
    // Close cookie consent if present
    try {
      const cookieOverlay = this.page.locator('.onetrust-pc-dark-filter');
      if (await cookieOverlay.isVisible()) {
        const acceptButton = this.page.getByRole('button', { name: 'Allow All' });
        await acceptButton.click({ timeout: 3000 });
        await this.page.waitForTimeout(500);
      }
    } catch (e) {
      // Cookie overlay not present or already dismissed
    }

    await this.trainStatusTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.trainStatusTab.click({ force: true });
  }

  async assertLoaded() {
    await expect(this.header).toBeVisible();
  }
  async enterDepartureStation(station: string) {
    await this.departureStation.fill(station);
    await this.departureStation.press('Enter');
  }

  async enterArrivalStation(station: string) {
    await this.arrivalStation.fill(station);
    await this.arrivalStation.press('Enter');
  }

   async selectDate(dayOffset: number) {
    // Open the calendar
    await this.selectCalendar.click();
    await this.month.waitFor({ state: 'visible' });
    
    // Calculate and format the target date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + dayOffset);
    const formattedDate = targetDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Click the date
    await this.page.getByRole('gridcell', { name: formattedDate }).click();
    await this.page.waitForTimeout(500);
  }

  async clickCheckStatusButton() {
    await this.checkStatusBtn.click();
    await this.page.waitForTimeout(15000);
  }

  async getTrainStatusLabelText() {
    const text = await this.resultsLocator.innerText();
    console.log(`Train Status label text: ${text}`);
    return text;
  }


  async scrollToTrainStatusDetails() {
    await this.showResults.first().scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000); // Wait for any lazy-loaded content to appear
    const pagesText = await this.noOfPages.count();

    for (let i = 0; i < pagesText; i++) {
      const pageButton = this.noOfPages.nth(i);
      const pageNum = await pageButton.innerText();
      this.noOfPages.nth(i).scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(2000); // Wait for any lazy-loaded content to appear 
      this.noOfPages.nth(i).click();
      await this.page.waitForTimeout(2000); // Wait for page to load after click

      const trainContainers = this.page.locator('.train-container.ng-star-inserted');
      const count = await trainContainers.count();

      // Loop through each container and extract data
      for (let i = 0; i < count; i++) {
        const container = trainContainers.nth(i);

        // Target only the train-status-mini component (collapsed view) to avoid duplicates
        const miniStatus = container.locator('train-status-mini');

        const trainNumber = await miniStatus.locator('.train-number').first().textContent();
        const departureTime = await miniStatus.locator('.time').first().textContent();
        const arrivalTime = await miniStatus.locator('.time-arr').first().textContent();
        const status = await miniStatus.locator('.status-text').first().textContent();

        console.log({
          trainNumber,
          departureTime,
          arrivalTime,
          status
        });
      }
    }
  }
}

