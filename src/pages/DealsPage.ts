import { Page, Locator, expect } from "@playwright/test";
import { count } from "console";
import { BasePage } from "./BasePage";
import { config } from "../utilities/config"
  ;

export class DealsPage extends BasePage {
  readonly page: Page;
  readonly deals: Locator;
  readonly deals_promotions: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.deals = page.getByRole('tab', { name: 'DEALS' });
    this.deals_promotions = page.getByRole('heading', { name: 'Deals & Promotions' });
    page.getByRole('heading', { name: 'Deals & Promotions' });
     
  }

   async clickDealsTab() {
        // Close cookie consent if present
        await this.deals.waitFor({ state: 'visible', timeout: 1000 });
        await this.deals.click();
    }

      async verifyDealsPage() {
        await expect(this.deals_promotions).toBeVisible();
         await this.page.waitForTimeout(1000); // Wait for any animations or dynamic content to load
    }
    
    async validateDealsLinkPresence(linkText: string) {
    
        // First, try to find a link with the data-automation-id attribute for exact match
    //    const automationIdLocator = this.page.locator(`a[data-automation-id="${linkText}"]`);
        const automationIdLocator = this.page.getByRole('link', { name: linkText, exact: true });
        const automationIdCount = await automationIdLocator.count();
        
        if (automationIdCount > 0) {
            await expect(automationIdLocator.first()).toBeVisible();
        } else {
            // Fallback: use getByRole but get the first match to avoid strict mode violation
            const roleLocator = this.page.getByRole('link', { name: linkText });
            const roleCount = await roleLocator.count();
            
            if (roleCount > 0) {
                // Get the first visible element
                await expect(roleLocator.first()).toBeVisible();
            } else {
                throw new Error(`Link "${linkText}" not found`);
            }
        }
    }

    
}