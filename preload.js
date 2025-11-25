const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (name) => ipcRenderer.invoke('readFile', name),
  writeFile: (name, data) => ipcRenderer.invoke('writeFile', name, data),
  removeFile: (name) => ipcRenderer.invoke('removeFile', name),
  searchFilesWith: (dir) => ipcRenderer.invoke('searchFilesWith', dir),
  createProdFile: (name) => ipcRenderer.invoke('createProdFile', name),
  createDir: (name) => ipcRenderer.invoke('createDir', name)
})