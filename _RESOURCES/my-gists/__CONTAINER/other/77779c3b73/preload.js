const { ipcRenderer, contextBridge } = require("electron");

let listener;
const bridge = {
  send: (data) => ipcRenderer.send("from-renderer", data),
  onMessage: (callback) => (listener = callback),
};

ipcRenderer.on("to-renderer", (event, arg) => {
  if (listener) {
    listener(arg);
  } else {
    console.warn("No listener");
  }
});

contextBridge.exposeInMainWorld("electron", {
  bridge,
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  appApi: {
    quitApp() {
      ipcRenderer.send("app-quit");
    },
  },
});
