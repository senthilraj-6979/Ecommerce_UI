import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { config } from "../utilities/config";

export class DropdownPage extends BasePage {
  readonly page: Page;
  readonly dropdownLbl: Locator;
  readonly gender: Locator;
  readonly male: Locator;
  readonly selectFriendDropdown: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly skill: Locator;
  readonly selectLanguageDropdown: Locator;
  readonly enterLanguage: Locator;


  constructor(page: Page) {
    super(page);
    this.page = page;
    this.dropdownLbl = page.getByRole('heading', { name: /Dropdown/i }).first();
    this.gender = page.locator('.ui.selection.dropdown').first();
    this.male = page.getByText('Male').first();
    // More resilient selector - matches dropdown with or without 'upward' class
    this.selectFriendDropdown = page.locator('.ui.fluid.selection.dropdown').nth(0);
    this.country = page.locator('.ui.fluid.selection.dropdown').nth(1);
    this.state = page.locator('.ui.fluid.selection.dropdown').nth(2);
    this.skill = page.locator('.ui.fluid.selection.dropdown').nth(3);
    this.selectLanguageDropdown = page.locator('span').filter({ hasText: 'Select Language' });
    this.enterLanguage = page.locator('div.ui.floating.dropdown').filter({ has: page.locator('input.search') });
    
  }

  async drpdownPageValidation() {
    await this.goto(config.baseURL);
    await this.waitVisible(this.dropdownLbl, 10000);
    await this.page.waitForLoadState('networkidle');
  }

  async clickDropdown() {
    await this.waitVisible(this.gender, 10000);
    await this.gender.click();
  }

  async selectMaleOption() {
    await this.waitVisible(this.male, 10000);
    await this.male.click();
    await this.page.waitForTimeout(2000); // Allow dropdown animation to complete
  }

  async clickSelectFriendDropdown() {
    await this.page.waitForTimeout(1000); // DOM update after previous interaction
    await this.waitVisible(this.selectFriendDropdown, 10000);
    await this.selectFriendDropdown.click();
     await this.page.waitForTimeout(3000); 
  }

  async selectFriend(friend: string) {
    // Scope to visible dropdown menu to avoid matching multiple elements
    const friendOption = this.page.locator('.visible.menu.transition .item').filter({ hasText: friend }).first();
    await this.waitVisible(friendOption, 10000);
    await friendOption.click();
    await this.page.waitForTimeout(2000); // Allow dropdown animation to complete
  }

    async clickCountryDropdown() {
    await this.page.waitForTimeout(1000); // DOM update after previous interaction
    await this.waitVisible(this.country, 10000);
    await this.country.click();
    await this.page.waitForTimeout(3000); 
  }

    async selectCountry(country: string) {
    // Scope to visible dropdown menu to avoid matching multiple elements
    const countryOption = this.page.locator('.visible.menu.transition .item').filter({ hasText: country }).first();
    await this.waitVisible(countryOption, 10000);
    await countryOption.click();
    await this.page.waitForTimeout(2000); // Allow dropdown animation to complete
  }

  async clickStateDropdown() {
    await this.page.waitForTimeout(1000); // DOM update after previous interaction
    await this.waitVisible(this.state, 10000);
    await this.state.click();
    await this.page.waitForTimeout(3000); 
  }

  async selectState(state: string) {
    // Scope to visible dropdown menu to avoid matching multiple elements
    const stateOption = this.page.locator('.visible.menu.transition .item').filter({ hasText: state }).first();
    await this.waitVisible(stateOption, 10000);
    await stateOption.click();
    await this.page.waitForTimeout(2000); // Allow dropdown animation to complete
  }

  async clickSkillDropdown() {
    await this.page.waitForTimeout(1000); // DOM update after previous interaction
    await this.waitVisible(this.skill, 10000);
    await this.skill.click();
    await this.page.waitForTimeout(3000); 
  }

  async selectSkill(skill: string) {
    // Scope to visible dropdown menu to avoid matching multiple elements
    const skillOption = this.page.locator('.visible.menu.transition .item').filter({ hasText: skill }).first();
    await this.waitVisible(skillOption, 10000);
    await skillOption.click();
    await this.page.waitForTimeout(2000); // Allow dropdown animation to complete
  }

   async clickLanguageDropdown() {
    await this.page.waitForTimeout(1000); // DOM update after previous interaction
    await this.waitVisible(this.selectLanguageDropdown, 10000);
    await this.selectLanguageDropdown.click();
    await this.page.waitForTimeout(3000); 
  }

  async enterSearchLanguage(language: string) {
    // Type in the search input within the dropdown
    const searchInput = this.page.locator('input.search');
    await this.waitVisible(searchInput, 10000);
    await searchInput.fill(language);
    await this.page.waitForTimeout(1000); // Wait for dropdown results to filter
    
    // Click the matching language option
    const languageOption = this.page.locator('.visible.menu.transition .item').filter({ hasText: language }).first();
    await this.waitVisible(languageOption, 10000);
    await languageOption.click();
    await this.page.waitForTimeout(2000); // Allow dropdown animation to complete
  }

}