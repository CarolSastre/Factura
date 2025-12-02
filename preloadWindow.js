const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    readFile: (name) => { return ipcRenderer.invoke('readFile', name) },
    writeFile: (name, data) => { return ipcRenderer.invoke('writeFile', name, data) }
})