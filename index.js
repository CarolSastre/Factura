const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs');

const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  win.loadFile('factura.html')
}

app.whenReady().then(() => {
  ipcMain.handle('readProductosFile', readProductosFile(lista))

  createWindow();
})

import { Producto } from './models/producto.js';
const productsPath = "./productos.json";

function readProductosFile(lista) {
  return new Promise((resolve, reject) => {
    fs.readFile(productsPath, (err, buffer) => {
      if (err) reject("Error leyendo el archivo " + productsPath);

      const productos = JSON.parse(buffer.toString());

      resolve(productos);

      Array.from(productos).forEach(prod => {
        lista.guardarProducto(new Producto(prod.nombre, prod.precio));
      });
    })

  })
}