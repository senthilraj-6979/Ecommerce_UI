import { Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { PWWorld } from "./world";

setDefaultTimeout(60_000);

Before(async function (this: PWWorld) {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext({ viewport: null });
  this.page = await this.context.newPage(); // <-- MUST be here

  // Handle JavaScript dialogs (alert, confirm, prompt)
  this.page.on('dialog', async (dialog) => {
    console.log(`Dialog type: ${dialog.type()}, message: ${dialog.message()}`);
    await dialog.accept(); // Change to dialog.dismiss() if needed
  });

  // Handle popup windows (new tabs/windows)
  this.page.on('popup', async (popup) => {
    console.log(`Popup opened: ${popup.url()}`);
    // Store popup reference if needed: this.popup = popup;
  });

  // quick debug
  console.log("HOOK: page created?", !!this.page);
});

After(async function (this: PWWorld, scenario) {
  // Take screenshot on failure
    if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page?.screenshot();
    if (screenshot) {
      await this.attach(screenshot, 'image/png');
    }
  }
  
  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});
  await this.browser?.close().catch(() => {});
});
