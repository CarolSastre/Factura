import { Controller } from './src/controller/controller.js';

const controller = new Controller();

window.onload = () => {
         
  // addEventListeners de la aplicacion

  document.getElementById("logo").addEventListener('click', () => controller.promptWindow());
  document.getElementById("equisAltaProducto").addEventListener('click', () => controller.promptWindow());
  
  document.getElementById("producto").addEventListener('change', () => controller.cargarInfoProducto());
  document.getElementById("unidades").addEventListener('change', () => controller.cargarInfoProducto());
  
  document.getElementById("factura").addEventListener('change', () => controller.cargarFactura()); 

  document.getElementById("btnBorrarCesta").addEventListener('click', () => controller.borraFactura(true));

  document.getElementById("btnCrearFactura").addEventListener('click', () => controller.guardaFactura(0))
  document.getElementById("btnModificarFactura").addEventListener('click', () => controller.guardaFactura(1))

  document.getElementById("btnEliminarFactura").addEventListener('click', () => controller.eliminaFactura())

  document.getElementById("btnAltaProducto").addEventListener('click', () => controller.altaProducto());
  
  document.getElementById("btnAnadirCarrito").addEventListener('click', () => controller.anyadirFilaFactura());
  
  controller.init();
}