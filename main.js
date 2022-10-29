const { app, BrowserWindow, webFrameMain } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 790,
    resizable: false,
  });

  win.loadFile("index.html");
  // win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
