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
    // Scroll to the footer section
    await this.footerSection.first().scrollIntoViewIfNeeded();
    
    // Verify footer section is visible
    await expect(this.footerSection.first()).toBeVisible();
    
        // Log the number of footer links found
    const linkCount = await this.footerSection.count();
    console.log(`Footer links found: ${linkCount}`);
  }

  // Validate that a specific link is present in the footer
  async validateFooterLinkPresence(linkText: string) {
    await this.footerSection.first().scrollIntoViewIfNeeded();
    const link = this.page.locator('.footer-list a', { hasText: linkText });
    await expect(link).toBeVisible();
    console.log(`✓ Footer link "${linkText}" is present`);
  }

  // Click a specific footer link and verify navigation
  async clickFooterLink(linkText: string) {
    await this.footerSection.first().scrollIntoViewIfNeeded();
    const link = this.page.locator('.footer-list a', { hasText: linkText });
    
    await expect(link).toBeVisible();
    console.log(`Clicking footer link: "${linkText}"`);
    
    // Check if link opens in new tab
    const target = await link.getAttribute('target');
    
    if (target === '_blank') {
      // Handle new tab/window
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        link.click()
      ]);
      
      // Wait for new page to load
      await newPage.waitForLoadState('domcontentloaded');
      console.log(`✓ New page loaded: ${newPage.url()}`);
      
          
      // Close the new tab and return to original page
      await newPage.close();
    } else {
      // Same page navigation
      await link.click();
      await this.page.waitForLoadState('domcontentloaded');
      console.log(`✓ Page loaded: ${this.page.url()}`);
      
 
      
      // Navigate back to home page
      await this.page.goBack();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  // Click all footer links and verify they work
  async clickAllFooterLinks() {
    await this.footerSection.first().scrollIntoViewIfNeeded();
    
    // Get all footer links
    const links = await this.footerSection.all();
    console.log(`Testing ${links.length} footer links...`);
    
    for (let i = 0; i < links.length; i++) {
      // Re-query the link each time to avoid stale element issues
      const currentLinks = await this.footerSection.all();
      const link = currentLinks[i];
      
      const linkText = await link.innerText();
      const href = await link.getAttribute('href');
      const target = await link.getAttribute('target');
      
      console.log(`\n[${i + 1}/${links.length}] Testing: "${linkText}" (${href})`);
      

        
        if (target === '_blank') {
          // Handle new tab
          const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            link.click()
          ]);
          
          await newPage.waitForLoadState('domcontentloaded', { timeout: 10000 });
          console.log(`✓ Opened in new tab: ${newPage.url()}`);
          
          await newPage.close();
        } else {
          // Same page navigation
          await link.click();
          await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
          console.log(`✓ Navigated to: ${this.page.url()}`);
          
          // Go back to home page
          await this.page.goBack();
          await this.page.waitForLoadState('domcontentloaded');
          
          // Scroll back to footer for next link
          await this.footerSection.first().scrollIntoViewIfNeeded();
        }
       
    }
  }
}


