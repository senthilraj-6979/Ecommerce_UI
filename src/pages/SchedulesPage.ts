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
    async selectDepartureDate() {
        await this.clickCalendar.click();
        await this.page.waitForTimeout(1000); // Wait for calendar to open
        
        // Wait for the date element to be visible
        await this.selectDate.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectDate.click();
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
        // Wait for results to load
        await this.page.waitForLoadState('networkidle', { timeout: 60000 });
        await this.page.waitForTimeout(2000); // Additional buffer for any dynamic content
    }


}
