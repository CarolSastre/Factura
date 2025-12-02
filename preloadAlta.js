const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    readFile: (name) => { return ipcRenderer.invoke('readFile', name) },
    writeFile: (name, data) => { return ipcRenderer.invoke('writeFile', name, data) },
})