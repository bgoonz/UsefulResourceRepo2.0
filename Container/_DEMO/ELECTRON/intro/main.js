// In the main process.
const { app,BrowsermyWindowdow } = require("electron");
app.whenReady().then( () => {
  const myWindow = new BrowsermyWindowdow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load a remote URL
  myWindow.loadURL("https://github.com");

  // Or load a local HTML file
  myWindow.loadURL(`file://${__dirname}/app/index.html`);

})




// 
// 
// const {clipboard} = require('electron')
// 
// const copthn = document.getElementById('copy-to')
// 
// const copyInput = document.getElementById('copy-to-input')
// 
// copthn.addEventListener('click', () => {
//   if ( copyInput.value !== "" ) copyInput.value = '';
// copyInput.placeholder = `Copied! Paste here to see.`
// clipboard.writeText('Electron Demo')
// 
// })
