// 1.
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  // ipacMain.handle()
  ipcMain.handle('readFile', readFile);
  ipcMain.handle('writeFile', writeFile);

  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

const readFile = (name) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(name)) {
      fs.readFile(name, (err, data) => {
        if (err) reject(new Error(err));
        resolve(JSON.parse(data));
      })
    }
    else reject(new Error(name + ' not found'));
  })
}

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) reject(new Error(err));
      else resolve('');
    })
  })
}