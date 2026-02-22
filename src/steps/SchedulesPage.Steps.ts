import { Given, When, Then } from "@cucumber/cucumber";
import { PWWorld } from "../utilities/world";
import { SchedulesPage } from "../pages/SchedulesPage";

Then('Click on the Schedules tab', async function (this: PWWorld) {
    const schedulesPage = new SchedulesPage(this.page);
    await schedulesPage.clickSchedulesTab();

         });

         Then('User should be navigated to Schedules page', async function (this: PWWorld) {
            const schedulesPage = new SchedulesPage(this.page);
            await schedulesPage.verifySchedulesPage()
         });


    Then('Click From Station {string}', async function (this: PWWorld, departureStation: string) {
        const schedulesPage = new SchedulesPage(this.page);
        await schedulesPage.enterFromStation(departureStation);
    });

    Then('Click To Station {string}', async function (this: PWWorld, arrivalStation: string) {
        const schedulesPage = new SchedulesPage(this.page);
        await schedulesPage.enterToStation(arrivalStation);
    });

    Then('Select schedule date', async function (this: PWWorld) {
        const schedulesPage = new SchedulesPage(this.page);
        await schedulesPage.selectDepartureDate();
    });

    Then('Click Find Schedules button', async function (this: PWWorld) {
        const schedulesPage = new SchedulesPage(this.page);
        await schedulesPage.clickFindSchedules();
    }); 
