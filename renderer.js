import { Controller } from './src/controller/controller.js';

const controller = new Controller();

window.onload = () => {
  // addEventListeners de la aplicacion
  document.getElementById("factura").addEventListener('change', () => controller.cargarFactura());

  document.getElementById("producto").addEventListener('change', () => controller.cargarInfoProducto());

  document.getElementById("btnBorrarCesta").addEventListener('click', () => controller.borraFactura(true));

  document.getElementById("btnCrearFactura").addEventListener('click', () => controller.guardaFactura(0))
  document.getElementById("btnModificarFactura").addEventListener('click', () => controller.guardaFactura(1))

  document.getElementById("btnEliminarFactura").addEventListener('click', () => controller.eliminaFactura())

  document.getElementById("btnAnadirCarrito").addEventListener('click', () => controller.anyadirFilaFactura());

  controller.init();
}

window.electronAPI.mandar_principal((event, datos, tipo) => {
  // Separa las acciones dependiendo de los datos a procesar
  if (tipo === 0) { // Añadir un producto
    controller.altaProducto(datos);
  } else if (tipo === 1) { // Cargar una factura
    controller.cargarFacturaExterna(datos);
  }
})