const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  // openFile: () => ipcRenderer.invoke('dialog:openFile')
  
  readProductosFile: (lista) => ipcRenderer.invoke('readProductosFile', lista)
  // readFacturas
})