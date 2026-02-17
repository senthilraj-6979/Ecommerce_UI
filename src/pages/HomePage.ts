import { Page, Locator, expect } from "@playwright/test";
import { count } from "console";
import { BasePage } from "./BasePage";

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
    await this.page.goto("https://aemtest.amtrak.com/home", { waitUntil: "domcontentloaded" });
    await this.acceptCookie.click();
  }

  async clickOneWayDropdown() {
    //await expect(this.acceptCookie).toBeVisible({ timeout: 30000 });
    const acceptCookieCount = await this.oneWayDropdown.count();
    console.log(`Accept cookie button count: ${acceptCookieCount}`);

    if (acceptCookieCount > 1) {
      await this.acceptCookie.click();
      await this.acceptCookie.click();
    }
    else {
      await this.oneWayDropdown.click();
    }

  }

   async clickBookWithPoints() {
      await this.usePointsCheckbox.click();
   }



  async clickOneWayOption() {
    await this.oneWayOption.click();
  }

  async assertLoaded() {
    await expect(this.header).toBeVisible();
  }

  async enterOriginCity(city: string) {
    await this.fromCity.click();
    await this.fromCity.fill(city);
  }

  async enterDestinationCity(city: string) {
    await this.toCity.click();
    await this.toCity.fill(city);
  }
  async clickDepartDate() {
    await this.departDate.click();
    await this.selectDate.click();
    await this.doneButton.click();
  }
  async clickFindTrains() {
    await this.findTrainsButton.click();
  }

}