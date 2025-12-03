const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron')
const path = require('path');
const url = require('url');
const fs = require('fs');
const moment = require('moment');

const FICHERO_PRODUCTOS = './productos.json';
const RUTA = './facturas';
let filePath;

let mainWindow;
let altaWindow;

let menuTemplate = [{
  label: 'Edit App',
  submenu: [{
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }, {
    type: 'separator'
  }, {
    label: 'My Submenu',
    submenu: [
      {
        label: 'Item 1'
      },
      {
        label: 'Item 2'
      }
    ]
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        // on reload, start fresh and close any old
        // open secondary windows
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: 'Toggle Full Screen',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    type: 'separator'
  }, {
    label: 'My Submenu',
    submenu: [
      {
        label: 'Item 1',
        type: 'checkbox',
        checked: true
      }, {
        label: 'Item 2',
        type: 'checkbox',
        checked: false
      }, {
        label: 'Item 3',
        type: 'radio',
        checked: true
      }, {
        label: 'Item 4',
        type: 'radio',
        checked: false
      }]
  }]
}, {
  label: 'Window',
  role: 'window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }, {
    label: 'Reopen Window',
    accelerator: 'CmdOrCtrl+Shift+T',
    enabled: false,
    key: 'reopenMenuItem',
    click: function () {
      app.emit('activate')
    }
  }]
}, {
  label: 'Factura',
  submenu: [{
    label: 'Cargar Factura',
    click: async () => { // ! ------------------------------------------------------
      const filePath = await openFile();
    }
  }]
}, {
  label: 'Productos',
  submenu: [{
    label: 'Dar producto de alta',
    key: 'reopenProdAlta',
    click: () => {
      mostrarVentana();
    }
  }]
}, {
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'Learn More',
    click: function () {
      electron.shell.openExternal('http://electron.atom.io')
    }
  }]
}]

function createWindows() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    title: "Factura v.3",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  altaWindow = new BrowserWindow({ // TODO: cambiar tamaño a 400x400 y volver no ajustable
    show: false,
    width: 600,
    height: 600,
    resizable: true,
    title: "Dar de alta un producto",
    webPreferences: {
      preload: path.join(__dirname, 'preloadAlta.js')
    }
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  altaWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'altaProducto.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', function () {
    mainWindow = null
    altaWindow.destroy();
  })

  altaWindow.on('close', (event) => {
    event.preventDefault();
    altaWindow.hide();
  })
}

app.on('ready', function () {
  ipcMain.handle('readFile', readFile);
  ipcMain.handle('writeFile', writeFile);
  ipcMain.handle('removeFile', removeFile);
  ipcMain.handle('searchFiles', searchFiles);
  ipcMain.handle('createProdFile', createProdFile);
  ipcMain.handle('createDir', createDir);
  ipcMain.handle('mostrarVentana', mostrarVentana);
  ipcMain.handle('openFile', openFile);

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  createWindows();
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

async function openFile() { // * ----------------------------- buscar archivos
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0]
  }
}

const mostrarVentana = () => {
  if (!altaWindow.isVisible()) {
    altaWindow.show();
  } else {
    altaWindow.hide();
  }
}

const readFile = (event, name) => {
  console.log("Entrando en 'readFile'");
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
  if (name === "") {
    name = "./facturas/Factura_" + moment().format("YYYYMMDD_HHmmss") + ".json";
  } if (!name === './productos.json') {
    name = "./facturas" + name;
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(name, JSON.stringify(data), (err) => {
      if (err) reject(new Error(err));
      else resolve('');
    })
  })
}

const removeFile = (event, name) => {
  console.log(name);
  name = "./" + name;
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

    fs.readdir(RUTA, (err, archivos) => {
      if (err) reject(new Error(err));
      resolve(archivos);
    })
  });
}

const createProdFile = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(FICHERO_PRODUCTOS)) {
      fs.writeFile(FICHERO_PRODUCTOS, '[]', (err) => {
        if (err) reject(new Error('No se ha podido crear el fichero ' + FICHERO_PRODUCTOS));
        else resolve(FICHERO_PRODUCTOS + ' creado');
      });
    } else {
      resolve(FICHERO_PRODUCTOS + ' encontrado');
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