const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require('electron')
const path = require('path');
const url = require('url');
const fs = require('fs');
const moment = require('moment');

const FICHERO_PRODUCTOS = './productos.json';
const RUTA = './facturas';

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
    label: 'Cargar Facturas'
  }, {
    label: 'Crear Factura'
  }, {
    label: 'Modificar Factura'
  }, {
    label: 'Borrar Factura'
  }]
}, {
  label: 'Productos',
  submenu: [{
    label: 'Cargar Productos'
  }, {
    label: 'Dar producto de alta',
    enabled: false,
    key: 'reopenProdAlta',
    click: function () {
      app.emit('activate')
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

const contextMenu = new Menu()
contextMenu.append(new MenuItem({ label: 'Cut', role: 'cut' }))
contextMenu.append(new MenuItem({ label: 'Copy', role: 'copy' }))
contextMenu.append(new MenuItem({ label: 'Paste', role: 'paste' }))
contextMenu.append(new MenuItem({ label: 'Select All', role: 'selectall' }))
contextMenu.append(new MenuItem({ type: 'separator' }))
contextMenu.append(new MenuItem({ label: 'Custom', click() { console.log('Custom Menu') } }))

ipcMain.on('show-context-menu', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender)
  contextMenu.popup(win)
})


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    title: "Factura v.3",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  altaWindow = new BrowserWindow({
    show: false,
    width: 350,
    height: 350,
    resizable: true, // !
    title: "Dar de alta un producto",
    webPreferences: {
      preload: path.join(__dirname, 'preloadWindow.js')
    }
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  altaWindow.loadURL('https://github.com'
    /*url.format({
    pathname: path.join(__dirname, 'altaProducto.html'),
    protocol: 'file:',
    slashes: true
  })*/
    )
  
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

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  createWindow();
})
/**
 * 
 * dentro de promptWindow() 
 * crear aquí para cambiar el show a 
 */

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const mostrarVentana = () => {
  if (!altaWindow.isVisible()) {
    altaWindow.show();
  } else {
    altaWindow.hide();
  }
}


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
        else resolve('');
      });
    } else {
      resolve('');
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