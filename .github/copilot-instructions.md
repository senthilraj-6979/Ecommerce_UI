# Ecommerce UI Copilot Instructions

## Project Overview
BDD test automation framework for Amtrak e-commerce UI using **Cucumber**, **Playwright**, and **TypeScript**. Tests validate user workflows (login, deals, schedules, train status, trips) across multiple browsers (Chromium, Firefox, Safari).

## Architecture Patterns

### Three-Layer Test Structure
1. **Feature Files** (`src/features/*.feature`): Gherkin scenarios with @regression/@trainStatus/@schedules tags
2. **Step Definitions** (`src/steps/*Steps.ts`): Glue between Gherkin and Page Objects using `Then`/`When`/`Given` decorators
3. **Page Objects** (`src/pages/*Page.ts`): UI interactions extending `BasePage`, using Playwright Locators

**Key Pattern**: Page class has readonly Locators as properties, async methods for interactions
```typescript
// LoginPage.ts
readonly emailInput: Locator;
async enterCredentials(email: string, password: string) { ... }

// LoginPage.Steps.ts
const loginPage = new LoginPage(this.page);
await loginPage.enterCredentials(email, password);
```

### Shared Context (PWWorld)
`src/utilities/world.ts` provides Cucumber world with `browser`, `context`, `page` properties. Steps access via `this.page`.

### Multi-Browser Support
Environment variable `BROWSER={chromium|firefox|webkit}` controls browser choice in hooks. See npm scripts for Safari/Firefox variants.

## Key Files & Commands

### Running Tests
- `npm run test:bdd` - All tests (Chromium, parallel=2)
- `npm run test:regression` - @regression tagged scenarios
- `npm run test:safari` / `npm run test:firefox` - Specific browsers
- `npm run test:trainStatus` / `npm run test:schedules` - Feature-specific
- `npm run test:all` - Full suite + HTML report generation
- `npm run test:cross-browser` - Sequential Chromium → Firefox → Safari

### Report Generation
- `npm run report:cucumber` - Generates `reports/cucumber/cucumber-report.html` via `generate-report.ts`

### Configuration Files
- `cucumber.json` - Parallel execution (2), ts-node/register, step/hooks paths
- `tsconfig.json` - Strict mode enabled, ES2020 target, commonjs module
- `src/utilities/config.ts` - Base URL (aemtest.amtrak.com), timeouts (60s default)

## Development Conventions

### BasePage Utilities
- `goto(url)` - Navigate with domcontentloaded wait
- `waitVisible(locator, timeout)` - Playwright test assertion
- `acceptCookiesIfPresent()` - Handles popup cookie consent (fallback pattern)
- `click(locator)` / `fill(locator, value)` - Common interactions

### Step Implementation Patterns
1. Instantiate page object: `new LoginPage(this.page)`
2. Call async page methods: `await loginPage.enterCredentials(email, password)`
3. Add explicit waits for animations/async content: `await this.page.waitForTimeout(2000)`
4. Use `waitForLoadState('networkidle')` for post-navigation validation

### Locator Strategy
- **Preferred**: `getByRole()` with accessible name (ARIA-aware, resilient)
- **Fallback**: `locator()` with CSS selectors (`.agr-popup-content`, `.popup-arrow`)
- **Interactive elements**: Store as readonly properties in Page class

### Timeout Management
- Global: 60,000ms in `hooks.ts`
- Element wait: 10,000-50,000ms for popup visibility
- Network wait: `waitForLoadState('networkidle', {timeout: 60000})`
- Animation delays: Explicit `waitForTimeout(2000-3000)` for DOM updates

## Common Tasks

### Add New Feature Scenario
1. Create `src/features/newFeature.feature` with @regression/@featureName tags
2. Create `src/pages/NewPage.ts` extending `BasePage`
3. Create `src/steps/NewPage.Steps.ts` with step implementations
4. Run `npm run test:bdd` to validate

### Modify Page Locators
- Update readonly Locator in page class constructor
- Prefer `getByRole()` over CSS selectors
- Test with `npm run test:bdd` + inspect HTML if locator fails

### Debug Failing Scenario
1. Check Playwright error in console (timeout, element not found)
2. Add `await this.page.pause()` in step for interactive debugging
3. Verify explicit waits around dynamic content
4. Check browser compatibility in hooks.ts if cross-browser issue

## Cross-Cutting Concerns

### Dialog & Popup Handling
- Dialogs (alert/confirm/prompt) auto-accept in hooks
- Popups (new tabs) logged but context-dependent
- Cookie popups use `acceptCookiesIfPresent()` in BasePage

### Attachment in Hooks
Info JSON attached to scenario reports for debugging (browser, timestamp, URL).

## Important Notes
- TypeScript strict mode enabled; no `any` types without justification
- Headless: false by default (UI visible during test); set true in CI
- Feature files are single-scenario per outline; Examples table drives parametrization
