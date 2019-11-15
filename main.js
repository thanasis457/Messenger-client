const { app, BrowserWindow } = require('electron')
const electron=require('electron')
const path=require('path')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 770,
    webPreferences: {
      nodeIntegration: false,
      webviewTag:true
    },
    icon : path.join(__dirname,"ms.icns")
  })
  // win.webContents.session.clearStorageData();
  if(process.platform!='darwin') win.setAutoHideMenuBar(true);
  win.loadFile('index.html');
  // and load the index.html of the app.

  // win.loadFile('index.html')
  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('close', event => {
			event.preventDefault();

			// Workaround for https://github.com/electron/electron/issues/10023
			if (process.platform=='darwin') {
				// On macOS we're using `app.hide()` in order to focus the previous window correctly
				app.hide();
			} else {
				win.hide();
			}
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready',()=>{
  createWindow();
  const app = electron.app;
  const image = electron.nativeImage.createFromPath(
    path.join(__dirname,"mes.png")
  );
  if(process.platform=='darwin') app.dock.setIcon(image);
  else win.setIcon(image);
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
