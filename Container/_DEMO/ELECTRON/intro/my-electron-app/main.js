const { app, BrowserWindow } = require("electron");
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
}
//In Electron, browser windows can only be created after the app module's ready event is fired.
// You can wait for this event by using the app.whenReady() API. 
//Call createWindow() after whenReady() resolves its Promise.
app.whenReady().then(() => {
  createWindow();
});
