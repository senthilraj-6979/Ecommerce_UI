# Screenshot Guide for Test Automation

## Overview
The framework automatically captures screenshots during test execution at key points to help with debugging and reporting.

## Screenshot Features Implemented

### 1. **Automatic Screenshots**

#### On Test Failure
- Screenshots are automatically captured when any test fails
- Saved to: `screenshots/FAILED_[scenario-name]_[timestamp].png`
- Also attached to Cucumber HTML report

#### During Footer Link Testing
- **Scroll to Footer**: Captures footer section when visible
- **Validate Link**: Highlights and captures each validated link
- **Click Link**: Captures before and after clicking each link
- **New Tabs**: Captures content when links open in new tabs
- **Errors**: Captures screenshot when link clicking fails

### 2. **Manual Screenshots**

You can take manual screenshots at any point in your test:

```gherkin
Then Take a screenshot "homepage_loaded"
Then Take a screenshot "after_login"
Then Take a screenshot "checkout_page"
```

### 3. **Screenshot Locations**

All screenshots are saved to: `/screenshots/` directory

Naming patterns:
- `footer_section_visible_[timestamp].png`
- `validate_link_[link-name]_[timestamp].png`
- `before_click_[link-name]_[timestamp].png`
- `after_click_[link-name]_[timestamp].png`
- `new_tab_[link-name]_[timestamp].png`
- `FAILED_[scenario-name]_[timestamp].png`

## Usage Examples

### Example 1: Basic Footer Test with Screenshots
```gherkin
Scenario: Test footer with automatic screenshots
  Given User is on Amtrak Home page
  When Amtrak Home page should be loaded
  Then Scroll down to the footer section  # Auto screenshot
  Then Validate the presence of "Contact Us" link in the footer  # Auto screenshot
```

### Example 2: Click Links with Screenshots
```gherkin
Scenario: Click footer links and capture screenshots
  Given User is on Amtrak Home page
  When Amtrak Home page should be loaded
  Then Scroll down to the footer section
  Then Click the "About Amtrak" link in the footer  # Screenshots before & after
  Then Click the "Careers" link in the footer  # Screenshots before & after
```

### Example 3: Manual Screenshots
```gherkin
Scenario: Manual screenshot capture
  Given User is on Amtrak Home page
  Then Take a screenshot "homepage_initial_state"
  When Amtrak Home page should be loaded
  Then Take a screenshot "homepage_fully_loaded"
  Then Scroll down to the footer section
  Then Take a screenshot "footer_section"
```

### Example 4: Test All Links with Screenshots
```gherkin
Scenario: Test all footer links at once
  Given User is on Amtrak Home page
  When Amtrak Home page should be loaded
  Then Click and verify all footer links  # Screenshots for each link
```

## Methods Available

### In BasePage (Available to all page objects)
```typescript
await this.takeScreenshot('custom_name');  // Full page screenshot
await this.takeScreenshot('custom_name', false);  // Viewport only screenshot
```

### In FooterPage
```typescript
await footerPage.footerSectionLinks();  // Scrolls + screenshot
await footerPage.validateFooterLinkPresence('Link Text');  // Validates + screenshot
await footerPage.clickFooterLink('Link Text');  // Clicks + before/after screenshots
await footerPage.clickAllFooterLinks();  // Tests all links with screenshots
```

## Configuration

### Full Page Screenshots (Default)
```typescript
await this.takeScreenshot('name');  // Captures entire page
```

### Viewport Only Screenshots
```typescript
await this.takeScreenshot('name', false);  // Captures visible area only
```

## Screenshot Cleanup

Screenshots are stored locally and excluded from git (via .gitignore).

To clean up old screenshots:
```bash
rm -rf screenshots/*
```

Or keep only recent ones:
```bash
# Keep last 100 screenshots
ls -t screenshots/*.png | tail -n +101 | xargs rm --
```

## Best Practices

1. **Let automatic screenshots work** - They capture key moments automatically
2. **Use manual screenshots sparingly** - Only when you need specific checkpoints
3. **Use descriptive names** - Make it easy to identify what was captured
4. **Review failure screenshots** - They show the exact state when tests fail
5. **Clean up periodically** - Remove old screenshots to save disk space

## Troubleshooting

### Screenshots not being created?
- Check that `screenshots/` directory exists
- Verify page is loaded before taking screenshot
- Check file permissions

### Screenshots too large?
- Use viewport-only mode: `takeScreenshot('name', false)`
- Compress PNGs with tools like `pngquant`

### Can't find screenshots?
- Look in `/screenshots/` directory in project root
- Check console output for screenshot paths
- Search for files with `.png` extension

## Integration with Reports

Screenshots on failure are automatically:
1. Saved to `screenshots/` directory
2. Attached to Cucumber JSON report
3. Embedded in HTML report (via `cucumber-html-reporter`)

View them in the HTML report after running:
```bash
npm run test:footers
npm run report:cucumber
```
