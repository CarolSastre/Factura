const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI2', {
    altaProducto: (producto) => ipcRenderer.send('altaProducto', producto)
})