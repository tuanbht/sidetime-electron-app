import { buildElectronApp } from "./configurations/globalTest";
import { test, expect } from "@playwright/test";
import { ElectronApplication } from "playwright-core";

let electronApp: ElectronApplication;

test.beforeAll(async () => {
  electronApp = await buildElectronApp();
});

test.afterAll(() => {
  electronApp.close();
});

test.describe("Sign in as user", async () => {
  test("user perspective", async () => {
    const page = await electronApp.firstWindow();

    await expect(
      page.getByText("Please sign in to continue.")
    ).toBeInViewport();

    await page.getByPlaceholder("Your email").fill("user@example.com");
    await page.getByPlaceholder("Your password").fill("password");
    await page.getByRole("button", { name: "SIGN IN" }).click();
  });
});
