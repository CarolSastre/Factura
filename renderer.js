import { Controller } from './src/controller/controller.js';

const controller = new Controller();

window.onload = () => {
  // addEventListeners de la aplicacion

  document.getElementById("logo").addEventListener('click', () => controller.promptWindow());

  document.getElementById("factura").addEventListener('change', () => controller.cargarFactura());

  document.getElementById("btnBorrarCesta").addEventListener('click', () => controller.borraFactura(true));

  document.getElementById("btnCrearFactura").addEventListener('click', () => controller.guardaFactura(0))
  document.getElementById("btnModificarFactura").addEventListener('click', () => controller.guardaFactura(1))

  document.getElementById("btnEliminarFactura").addEventListener('click', () => controller.eliminaFactura())

  document.getElementById("btnAnadirCarrito").addEventListener('click', () => controller.anyadirFilaFactura());

  controller.init();
}

window.electronAPI.getAltaProducto((data) => {
  controller.buscarProductos(data);
})