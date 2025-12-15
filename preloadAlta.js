const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI2', {
    anadirProducto: (producto) => ipcRenderer.send('anadirProducto', producto)
})