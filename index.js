const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const fs = require('fs');
const FICHERO_PRODUCTOS = './productos.json';

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

const readFile = (event, name) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(name)) {
      fs.readFile(name, 'utf-8', (err, data) => {
        if (err) reject(new Error(err));
        resolve(data);
      })
    } else {
      reject(new Error(name + ' not found'))
    };
  });
}

const writeFile = (event, name, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, JSON.stringify(data), (err) => {
      if (err) reject(new Error(err));
      else resolve('');
    })
  })
}

const removeFile = (event, name) => {
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

const searchFiles = (event, dir) => {
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

const createProdFile = () => {
  return new Promise((resolve, reject) => {
    console.log(FICHERO_PRODUCTOS);
    if (!fs.existsSync(FICHERO_PRODUCTOS)) {
      fs.writeFile(FICHERO_PRODUCTOS, '[]', (err) => {
        if (err) {
          reject(new Error('No se ha podido crear el fichero ' + FICHERO_PRODUCTOS));
          console.log("hola");
        }
        else resolve('');
      });
    }
  });
}

const createDir = (event, name) => {
  return new Promise((resolve) => {
    if (!fs.existsSync(name)) {
      fs.mkdirSync(name);
      resolve('Carpeta creada');
    }
    resolve('Carpeta encontrada')
  })
}