import { app, BrowserWindow, ipcMain, session } from "electron";
import { readFileSync, rmSync, writeFileSync } from "fs-extra";
import path from "path";
import fs from "fs/promises";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.

  mainWindow.loadURL(`http://localhost:3000`);

  ipcMain.handle("getClientTXT", (event, args) => {
    try {
      const file = readFileSync(args.clientPath, { encoding: "utf-8" })
        .split("\n")
        .slice(-15)
        .filter((entry) => entry !== "");
      return file;
    } catch {
      return "";
    }
  });
  ipcMain.handle("serializeCookie", () => {
    session.defaultSession.cookies.flushStore();
  });

  ipcMain.handle("fs", (event, args) => {
    console.log(args);
    const lib = fs[args.key as keyof typeof fs];
    if (typeof lib == "function") {
      lib(...(args.args as any));
    }
  });
  ipcMain.handle("deleteClientTXT", (event, args) => {
    rmSync(args.clientPath);
  });
  ipcMain.handle("getFile", async (event, args) => {
    console.log(args);
    return "";
  });
  ipcMain.handle("saveFile", async (event, args) => {
    console.log(args);
    return writeFileSync(args.filePath, args.data);
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
