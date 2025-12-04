const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI2', {
    altaProducto: (producto) => ipcRenderer.invoke('altaProducto', producto)
})