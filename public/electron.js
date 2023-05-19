const {
  app,
  BrowserWindow,
  ipcMain,
  systemPreferences,
  protocol,
  globalShortcut,
} = require("electron");
const { openSystemPreferences } = require("electron-util");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
const Rollbar = require("rollbar");

let mainWindow;
let openedURL;

const log = (s) => {
  console.log(s);
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.executeJavaScript(`console.log("${s}")`);
  }
};

// eslint-disable-next-line
const rollbar = Rollbar.init({
  accessToken: "7418a61c1f5745e6b44bf02ca30f1124",
  enabled: !isDev,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    platform: "client",
  },
});

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.resolve(__dirname, "electron-preload.js"),
      devTools: true,
    },
  });
  mainWindow.setMenu(null);
  if (true) {
    mainWindow.setPosition(0, 0);
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools({ mode: "bottom" });
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: "index.html",
        protocol: "file",
        slashes: true,
      })
    );
  }
  app.setAsDefaultProtocolClient("sidetime");
  mainWindow.on("closed", () => (mainWindow = null));

  mainWindow.webContents.on("did-fail-load", () => {
    log("did-fail-load");

    if (!isDev) {
      mainWindow.loadURL(
        url.format({
          pathname: "index.html",
          protocol: "file",
          slashes: true,
        })
      );
    }
  });

  const deepLink = openedURL || process.argv[1];
  ipcMain.on("ready-for-deep-link", () => {
    mainWindow.webContents.send("deep-link", deepLink);
  });

  ipcMain.on("request-media-access", async () => {
    let isGranted = false;

    if (process.platform === "darwin") {
      isGranted = await systemPreferences.askForMediaAccess("microphone");
      isGranted =
        (await systemPreferences.askForMediaAccess("camera")) && isGranted;
    } else {
      isGranted = true;
    }

    mainWindow.webContents.send("request-media-access-return", isGranted);
  });

  ipcMain.handle("is-screenshare-access-granted", () => {
    return systemPreferences.getMediaAccessStatus("screen") === "granted";
  });

  ipcMain.on("open-screenshare-preferences", () => {
    openSystemPreferences("security", "Privacy_ScreenCapture");
  });

  log("deeplink url: " + deepLink);

  ipcMain.on("openExternalUrl", (_, url) => {
    require("electron").shell.openExternal(url);
  });
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
  mainWindow && mainWindow.webContents.send("deep-link", openedURL);
});

app.whenReady().then(() => {
  protocol.interceptFileProtocol(
    "file",
    (request, callback) => {
      const urlWithoutProtocol = request.url.substr(7);
      callback({ path: path.normalize(`${__dirname}/${urlWithoutProtocol}`) });
    },
    (err) => {
      if (err) console.error("Failed to register protocol");
    }
  );
  createWindow();
});

app.on("activate", () => !mainWindow && createWindow());
app.on("window-all-closed", () => app.quit());

app.on("browser-window-focus", function () {
  globalShortcut.register("CommandOrControl+R", () => {
    console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("F5", () => {
    console.log("F5 is pressed: Shortcut Disabled");
  });
});

app.on("browser-window-blur", function () {
  globalShortcut.unregister("CommandOrControl+R");
  globalShortcut.unregister("F5");
});
