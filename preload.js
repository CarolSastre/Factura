const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (name) => { return ipcRenderer.invoke('readFile', name) },
  writeFile: (name, data) => { return ipcRenderer.invoke('writeFile', name, data) },
  removeFile: (name) => { return ipcRenderer.invoke('removeFile', name) },
  searchFiles: (dir) => { return ipcRenderer.invoke('searchFiles', dir) },
  createProdFile: () => { return ipcRenderer.invoke('createProdFile') },
  createDir: (name) => { return ipcRenderer.invoke('createDir', name) },
  mostrarVentana: () => { return ipcRenderer.invoke('mostrarVentana') },
  onData: (data) => { return ipcRenderer.on('data-to-main', data) },
  openFile: () => { return ipcRenderer.invoke('openFile') }
})