const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let openedURL;

const log = (s) => {
  console.log(s);
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.executeJavaScript(`console.log("${s}")`);
  }
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.resolve(__dirname, "electron-preload.js"),
    },
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => (mainWindow = null));

  const deepLink = openedURL || process.argv[1];
  ipcMain.on("ready-for-deep-link", () => {
    mainWindow.webContents.send("deep-link", deepLink);
  });
  log("deeplink url: " + deepLink);
};

const lock = app.requestSingleInstanceLock();

if (lock) {
  app.on("second-instance", (_event, argv) => {
    log("second instance deeplink url: " + argv.slice(1));
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();

    mainWindow.webContents.send("deep-link", argv[1]);
    mainWindow.focus();
  });
} else {
  app.quit();
  return;
}
app.on("open-url", (event, url) => {
  event.preventDefault();
  openedURL = url;
  log("open-url# " + url);
});

app.on("ready", createWindow);
app.on("activate", () => !mainWindow && createWindow());
app.on("window-all-closed", () => app.quit());
