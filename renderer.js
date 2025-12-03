const { ipcRenderer } = require('electron/renderer');

const channel = new MessageChannel()

const port1 = channel.port1
const port2 = channel.port2

port2.postMessage({ answer: 42 })

ipcRenderer.postMessage('port', null, [port1])