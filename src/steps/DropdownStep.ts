import { Given, When, Then } from "@cucumber/cucumber";
import { PWWorld } from "../utilities/world";
import { DropdownPage } from "../pages/DropdownPage";
import { config } from "../utilities/config";


// Reuse the shared Home page step definitions from `HomePage.Steps.ts`.
// Do not duplicate the Given/When steps for navigating to the Home page
// — Cucumber will match the definitions from the shared file.

Then('User is on dropdown Home page', async function (this: PWWorld) {
    const dropdownPage = new DropdownPage(this.page);
    await dropdownPage.drpdownPageValidation();
});

  When('Verify dropdown should be loaded', function () {
         const dropdownPage = new DropdownPage(this.page);
         return dropdownPage.clickDropdown();
       });
      
       
     
  Then('Click on the dropdown option', function () {
         const dropdownPage = new DropdownPage(this.page);
         return dropdownPage.selectMaleOption();
         });


  Then('Click select friend dropdown', async function (this: PWWorld) {
          const dropdownPage = new DropdownPage(this.page);
          await dropdownPage.clickSelectFriendDropdown();
  });


  Then('select {string} as friend', async function (this: PWWorld, friend: string) {
          const dropdownPage = new DropdownPage(this.page);
      await dropdownPage.selectFriend(friend);
  });

  Then('Click country dropdown', async function (this: PWWorld) {
          const dropdownPage = new DropdownPage(this.page);
          await dropdownPage.clickCountryDropdown();
  });

  Then('select {string} as country', async function (this: PWWorld, country: string) {
          const dropdownPage = new DropdownPage(this.page);
          await dropdownPage.selectCountry(country);
  });

  Then('Click skill dropdown', async function (this: PWWorld) {
          const dropdownPage = new DropdownPage(this.page);
          await dropdownPage.clickSkillDropdown();
  });

  Then('select {string} as state', async function (this: PWWorld, state: string) {
          const dropdownPage = new DropdownPage(this.page);
          await dropdownPage.selectState(state);
  });

  Then('select {string} as skill', async function (this: PWWorld, skill: string) {
          const dropdownPage = new DropdownPage(this.page);
          await dropdownPage.selectSkill(skill);
  });

  Then('Click state dropdown', async function (this: PWWorld) {
          const dropdownPage = new DropdownPage(this.page);
          await dropdownPage.clickStateDropdown();
  });

  Then('Click Language dropdown', async function (this: PWWorld) {
          const dropdownPage = new DropdownPage(this.page);
          await dropdownPage.clickLanguageDropdown();
  });

  Then('Enter {string} as language', async function (this: PWWorld, language: string) {
          const dropdownPage = new DropdownPage(this.page);
          await dropdownPage.enterSearchLanguage(language);
  });
       