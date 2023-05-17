import { _electron as electron } from "playwright";
import { findLatestBuild, parseElectronApp } from "electron-playwright-helpers";
import { ElectronApplication } from "playwright-core";

export const buildElectronApp = async (): Promise<ElectronApplication> => {
  const latestBuild = findLatestBuild("dist");
  // parse the directory and find paths and other info
  const appInfo = parseElectronApp(latestBuild);

  let newElectronApp: ElectronApplication = await electron.launch({
    args: [appInfo.main],
    executablePath: appInfo.executable,
  });

  newElectronApp.on("window", async (page) => {
    const filename = page.url()?.split("/").pop();
    console.log(`Window opened: ${filename}`);

    // capture errors
    page.on("pageerror", (error) => {
      console.error(error);
    });
    // capture console messages
    page.on("console", (msg) => {
      console.log(msg.text());
    });
  });

  return newElectronApp;
};
