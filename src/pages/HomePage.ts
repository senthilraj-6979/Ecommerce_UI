import { Page, Locator, expect } from "@playwright/test";
import { count } from "console";
import { BasePage } from "./BasePage";
import { config } from "../utilities/config"
;  

export class HomePage extends BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly oneWayDropdown: Locator;
  readonly acceptCookie: Locator;
  readonly oneWayOption: Locator;
  readonly usePointsCheckbox: Locator;
  readonly fromCity: Locator;
  readonly toCity: Locator;
  readonly departDate: Locator;
  readonly selectDate: Locator;
  readonly doneButton: Locator;
  readonly findTrainsButton: Locator;



  constructor(page: Page) {
        super(page);
    if (!page) throw new Error('HomePage: page is undefined (check Cucumber Before hook / World)');
    this.page = page;
    //   page.setDefaultNavigationTimeout(30000);
    this.header = this.page.getByRole('banner');
    this.oneWayDropdown = this.page.getByRole('button', { name: 'Trip Type:One-Way' });
    // this.oneWayDropdown = this.page.getByText('One-Way', { exact: true });
    this.acceptCookie = page.getByRole('button', { name: 'Allow All' });
    this.usePointsCheckbox =   page.locator('//input[@id="redeemPoints-checkbox"]/..');
    this.oneWayOption = page.getByRole('button', { name: 'One-Way', exact: true });
    this.fromCity = page.getByPlaceholder('From', { exact: true });
    this.toCity = page.getByPlaceholder('To', { exact: true });

    this.departDate = this.page.getByRole('textbox', { name: 'Depart Date' });
    this.selectDate = page.getByText('9').nth(3);
    this.doneButton = page.getByRole('button', { name: 'Done' });
    this.findTrainsButton = page.getByRole('button', { name: 'FIND TRAINS' });

  }


  async open() {
    await this.page.goto(config.baseURL, { waitUntil: "load", timeout: 25000 });
    // Wait for page to be fully loaded and interactive
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for the header to be visible before proceeding
    await this.header.waitFor({ state: 'visible', timeout: 10000 });
    // Accept cookies if banner is present
    try {
      await this.acceptCookie.waitFor({ state: 'visible', timeout: 5000 });
      await this.acceptCookie.click();
       await this.acceptCookie.click();
      await this.page.waitForTimeout(2000); // Wait for cookie banner to fully disappear
    } catch (e) {
      // Cookie banner not present or already accepted
      console.log('Cookie banner not found - likely already accepted');
    }
    // Additional wait for any page elements to stabilize
    await this.page.waitForTimeout(1000);
  } 

  async clickOneWayDropdown() {
    // Wait for page to be fully loaded and element to be actionable
    await this.page.waitForLoadState('domcontentloaded');
    
    
    
    // Ensure element is enabled and not covered by overlays
    await this.oneWayDropdown.waitFor({ state: 'attached', timeout: 10000 });
    // Scroll element into view if needed
    //await this.oneWayDropdown.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(1000); // Brief wait for any animations
    await this.oneWayDropdown.click({ timeout: 10000 });
  }

   async clickBookWithPoints() {
      await this.usePointsCheckbox.click();
   }



  async clickOneWayOption() {
    await this.oneWayOption.click();
  }

  async assertLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.header).toBeVisible();
    // Ensure the page is fully interactive
    await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
      // If networkidle times out, continue anyway as page might be functional
      console.log('Page did not reach networkidle state, but proceeding');
    });
  }

  async enterOriginCity(city: string) {
    await this.fromCity.click();
    await this.fromCity.fill(city);
  }

  async enterDestinationCity(city: string) {
    await this.toCity.click();
    await this.toCity.fill(city);
  }
  /**
   * Select a date from the calendar
   * @param targetMonth - Month name (e.g., "March", "April") - optional
   * @param targetDay - Day number (e.g., 15, 25)
   * @param targetYear - Year (e.g., 2026) - optional
   */
  async selectDepartureDate(targetDay: number, targetMonth?: string, targetYear?: number) {
    // Click to open the calendar
    await this.departDate.click();
    await this.page.waitForTimeout(1000);

    // If month and year are provided, navigate to that month
    if (targetMonth && targetYear) {
      const nextMonthButton = this.page.getByRole('button', { name: 'Next month' });
      
      // Try up to 12 times to find the target month (max 1 year forward)
      for (let i = 0; i < 12; i++) {
        // Check if target month is visible
        const monthHeader = this.page.locator('.ngb-dp-month-name').first();
        const currentMonthText = await monthHeader.textContent();
        
        
        if (currentMonthText?.includes(targetMonth) && currentMonthText?.includes(targetYear.toString())) {
          break; // Found the target month
        }
        
        // Click next month
        await nextMonthButton.click();
        await this.page.waitForTimeout(500);
      }
    }

    // Select the date by aria-label (more reliable than just clicking a number)
    // Build a regex pattern to match the date
    const datePattern = targetMonth && targetYear 
      ? new RegExp(`${targetMonth}\\s+${targetDay},\\s+${targetYear}`, 'i')
      : new RegExp(`\\b${targetDay},\\s+\\d{4}$`); // Match any month with this day number

    // Find the gridcell with the matching aria-label that is NOT disabled
    const dateCell = this.page.locator(`[role="gridcell"]:not(.disabled)[aria-label*="${targetDay}"]`).first();
    await dateCell.click();
    
    // Click Done button
    await this.doneButton.click();
  }

  // Keep the old method for backward compatibility
  async clickDepartDate() {
    await this.departDate.click();
    await this.selectDate.click();
    await this.doneButton.click();
  }
  async clickFindTrains() {
    await this.findTrainsButton.click();
    // Wait for navigation to complete after clicking Find Trains
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
  }

}