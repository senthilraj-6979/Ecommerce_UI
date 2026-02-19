import { Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { PWWorld } from "./world";

setDefaultTimeout(60_000);

Before(async function (this: PWWorld) {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext({ viewport: null });
  this.page = await this.context.newPage(); // <-- MUST be here

  // quick debug
  console.log("HOOK: page created?", !!this.page);
});

After(async function (this: PWWorld, scenario) {
  // Take screenshot on failure
  
  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});
  await this.browser?.close().catch(() => {});
});
