const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (name) => ipcRenderer.invoke('readFile', name),
  writeFile: (name, data) => ipcRenderer.invoke('writeFile', name, data)
})