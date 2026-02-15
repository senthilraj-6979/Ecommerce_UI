import reporter from "cucumber-html-reporter";

const options = {
  theme: "bootstrap",
  jsonFile: "reports/cucumber/cucumber-report.json",
  output: "reports/cucumber/cucumber-report.html",
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false
};

reporter.generate(options);



