import { _electron as electron } from "playwright";
import { test, expect, ElectronApplication, Page } from "@playwright/test";

test.describe("Check Man Page", async () => {
  let electronApp: ElectronApplication;
  let firstWindow: Page;

  test.beforeAll(async () => {
    electronApp = await electron.launch({
      args: ['.'],
      executablePath: 'dist/mac/Sidetime.app/Contents/MacOS/Sidetime'
    });
    firstWindow = await electronApp.firstWindow();
  });

  test("landing page", async () => {
    await expect(firstWindow).toHaveTitle('Sidetime');
  });


  test.afterAll(async () => {
    await electronApp.close();
  });
});
