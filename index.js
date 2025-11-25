const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const fs = require('fs');

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
  ipcMain.handle('removeFile', removeFile);
  ipcMain.handle('searchFiles', searchFiles);
  ipcMain.handle('createProdFile', createProdFile);
  ipcMain.handle('createDir', createDir);

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

const writeFile = ( path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) reject(new Error(err));
      else resolve('');
    })
  })
}

const removeFile = (name) => {
  return new Promise((resolve, reject) => {
    fs.unlink(name, (err) => {
      if (err) reject(new Error(err));
      else {
        console.log(name + " was deleted");
        resolve('');
      }
    });
  });
}

const searchFiles = (dir) => {
  return new Promise((resolve, reject) => {

    fs.readdir(dir, (err, archivos) => {
      if (err) reject(new Error(err));
      else {
        // archivos = archivos.filter(element => element.startsWith(prefix));
        resolve(archivos);
      }
    })
  });
}

const createProdFile = (name) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(name)) {
      fs.writeFile(name, '[]', (err) => {
        if (err) reject(new Error('No se ha podido crear el fichero "' + name + '"'));
        else resolve('');
      });
    }
  });
}

const createDir = (name) => {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(name);
  }
}