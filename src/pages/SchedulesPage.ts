import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";


export class SchedulesPage extends BasePage {
    readonly page: Page;
    readonly schedulesTab: Locator;
    readonly header: Locator;
    readonly findSchedules: Locator;
    readonly fromStation: Locator;
    readonly toStation: Locator;
    readonly departDate: Locator;
    readonly selectDate: Locator;
    readonly doneButton: Locator;
    readonly findSchedulesButton: Locator;
    readonly clickCalendar: Locator;
    readonly availableTripsHeading: Locator;
    readonly showResults: Locator;
    readonly noOfPages: Locator;
    readonly searchByDropdown: Locator;
    readonly routeOption: Locator;
    readonly selectRouteDropdown: Locator;



    constructor(page: Page) {
        super(page);
        this.page = page;
        this.schedulesTab = page.getByRole('tab', { name: 'SCHEDULES' });
        this.findSchedules = page.getByText('FIND SCHEDULE', { exact: true });
        this.header = this.page.getByRole('banner');
        this.fromStation = this.page.getByRole('combobox', { name: 'From station' });
        this.toStation = this.page.getByRole('combobox', { name: 'To station' });
        this.departDate = this.page.getByRole('textbox', { name: 'Depart Date' });
        this.selectDate = page.getByText('9').nth(3);
        this.doneButton = page.getByRole('button', { name: 'Done' });
        this.findSchedulesButton = page.getByRole('button', { name: 'FIND SCHEDULE' });
        this.clickCalendar = page.getByRole('textbox', { name: 'Departure Date in MM/DD/YYYY format' });
        this.selectDate = page.locator('.calendar-day.today');
        this.availableTripsHeading = page.getByRole('heading', { name: 'Available Trips' });
        this.showResults = this.page.locator('.paginator__result-text');
        this.noOfPages = this.page.locator('.pagination-page.page-item');

        this.searchByDropdown = this.page.getByRole('button').filter({ hasText: 'Train Station' }).first();
        this.routeOption = this.page.getByRole('menuitem', { name: 'Route' });
        this.selectRouteDropdown = this.page.getByRole('combobox', { name: 'Route' });

    }
    async clickSchedulesTab() {
        // Close cookie consent if present
        await this.schedulesTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.schedulesTab.click();
    }
    async verifySchedulesPage() {
        await expect(this.header).toBeVisible();
        await expect(this.findSchedules).toBeVisible();
        await this.page.waitForTimeout(2000); // Wait for any animations or dynamic content to load
    }
    async enterFromStation(station: string) {
        await this.fromStation.fill(station);
        await this.fromStation.press('Enter');
    }
    async enterToStation(station: string) {
        await this.toStation.fill(station);
        await this.toStation.press('Enter');
    }
    async selectDepartureDate(targetMonth?: string, targetYear?: number, targetDay?: number) {
        await this.clickCalendar.click();
        await this.page.waitForTimeout(1000); // Wait for calendar to open

        // If specific month and year are provided, navigate to that month
        if (targetMonth && targetYear) {
            const targetMonthYear = `${targetMonth} ${targetYear}`;
            let maxAttempts = 12; // Prevent infinite loop (1 years)
            let attempts = 0;

            while (attempts < maxAttempts) {
                // Get all month names currently visible in the calendar
                const monthNames = await this.page.locator('.ngb-dp-month-name').allTextContents();

                // Check if target month is already visible
                const targetFound = monthNames.some(name => name.trim() === targetMonthYear);

                if (targetFound) {
                    console.log(`Found target month: ${targetMonthYear}`);
                    break;
                }

                // Click next month button to navigate forward
                await this.page.locator('.ngb-dp-arrow-next button').click();
                await this.page.waitForTimeout(300);
                attempts++;
            }

            if (attempts >= maxAttempts) {
                console.log(`Could not find month: ${targetMonthYear} after ${maxAttempts} attempts`);
            }
        }

        // Select the specific day or default to today
        if (targetDay && targetMonth && targetYear) {
            // Select by aria-label which includes full date info
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

            // Find days matching the target day number that are not disabled
            const dayLocator = this.page.locator(`div[role="gridcell"]:not(.disabled) .calendar-day:has-text("${targetDay}")`);
            const count = await dayLocator.count();

            // Click the appropriate day (might be multiple days with same number visible)
            for (let i = 0; i < count; i++) {
                const parentCell = dayLocator.nth(i).locator('..');
                const ariaLabel = await parentCell.getAttribute('aria-label');

                if (ariaLabel && ariaLabel.includes(`${targetMonth}`) && ariaLabel.includes(`${targetYear}`)) {
                    await dayLocator.nth(i).click();
                    break;
                }
            }
        } else {
            // Default to today
            await this.selectDate.waitFor({ state: 'visible', timeout: 10000 });
            await this.selectDate.click();
        }

        await this.page.waitForTimeout(500); // Wait for date selection to register

        // Check if Done button exists before clicking
        const doneButtonVisible = await this.doneButton.isVisible({ timeout: 5000 }).catch(() => false);
        if (doneButtonVisible) {
            await this.doneButton.click();
        } else {
            console.log('Done button not found - date might have been selected directly');
            // Calendar might auto-close after selecting date
        }
    }
    async clickFindSchedules() {
        await this.findSchedulesButton.click();
        // Wait for results to load - use domcontentloaded instead of networkidle as it's more reliable
        await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 }).catch(() => {
            console.log('DOM content load timeout - continuing anyway');
        });

        // Wait for the Available Trips heading to appear or for a "no results" message
        await this.page.waitForSelector(
            'h2:has-text("Available Trips"), .no-results, .error-message',
            { timeout: 15000, state: 'visible' }
        ).catch(() => {
            console.log('Results not loaded within 15 seconds - continuing to verify');
        });
    }

    async verifyScheduleResults() {
        // Wait for the heading with increased timeout since results may take time to load
        await expect(this.availableTripsHeading).toBeVisible({ timeout: 15000 });
        console.log('Available Trips heading is visible - schedules loaded successfully');
    }

    async scrollToTrainStatusDetails() {
        await this.showResults.first().scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000); // Wait for any lazy-loaded content to appear
        const pagesText = await this.noOfPages.count();

        for (let i = 0; i < pagesText; i++) {
            const pageButton = this.noOfPages.nth(i);
            //    const pageNum = await pageButton.innerText();
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

    async getSearchByDropdownOptions() {
        // First, wait for the dropdown button to be visible
        await this.searchByDropdown.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Dropdown button is visible');

        // Click to open the dropdown
        await this.searchByDropdown.click();
        await this.page.waitForTimeout(1000); // Wait for dropdown animation
        console.log('Clicked dropdown button');

        // Wait for dropdown options to appear - try multiple possible selectors
        const dropdownMenu = this.page.locator('.dropdown-menu, .dropdown-content, [role="menu"]').first();
        await dropdownMenu.waitFor({ state: 'visible', timeout: 5000 });
        await expect(dropdownMenu).toBeVisible();
        console.log('Dropdown menu is visible');

        // Get all child elements (options) of the dropdown
        const children = dropdownMenu.locator('> *');
        const childCount = await children.count();
        console.log(`Found ${childCount} options in dropdown`);

        // Iterate through children and log their text
        for (let i = 0; i < childCount; i++) {
            const text = await children.nth(i).textContent();
            console.log(`Option ${i}: ${text?.trim()}`);
        }
    }

    async routeOptionInSearchByDropdown() {
        // Wait for the Route option to be visible and click it
        await this.routeOption.waitFor({ state: 'visible', timeout: 1000 });
        await this.routeOption.click();
    }

    async selectRouteOptionInDropdown() {
        // Wait for the route dropdown to be visible
        await this.selectRouteDropdown.waitFor({ state: 'visible', timeout: 5000 });
        console.log('Route dropdown is visible');

        // Click to open the route dropdown
        await this.selectRouteDropdown.click();
    }
    async selectRouteFromDropdown(routeName: string) {

        const dropdownOptions = this.page.locator('.dropdown-menu .dropdown-item');
        await dropdownOptions.waitFor({ state: 'visible', timeout: 5000 });

    }
    async selectRoute(route: string) {
        const routeOption = this.page.getByText(route, { exact: true }).first();
        await routeOption.waitFor({ state: 'visible', timeout: 5000 });
        await routeOption.click();
        await this.page.waitForTimeout(2000); // Wait for any dynamic content to load after selecting route         
    }
}

