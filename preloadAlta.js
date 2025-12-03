const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI2', {
    readFile: (name) => { return ipcRenderer.invoke('readFile', name) },
    writeFile: (name, data) => { return ipcRenderer.invoke('writeFile', name, data) }
})