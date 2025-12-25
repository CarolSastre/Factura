import { Controller } from './src/controller/controller.js';

const controller = new Controller();

window.onload = () => {
  // addEventListeners de la aplicacion

  document.getElementById("logo").addEventListener('click', () => controller.promptWindow());

  document.getElementById("factura").addEventListener('change', () => controller.cargarFactura());

  document.getElementById("producto").addEventListener('change', () => controller.cargarInfoProducto());

  document.getElementById("btnBorrarCesta").addEventListener('click', () => controller.borraFactura(true));

  document.getElementById("btnCrearFactura").addEventListener('click', () => controller.guardaFactura(0))
  document.getElementById("btnModificarFactura").addEventListener('click', () => controller.guardaFactura(1))

  document.getElementById("btnEliminarFactura").addEventListener('click', () => controller.eliminaFactura())

  document.getElementById("btnAnadirCarrito").addEventListener('click', () => controller.anyadirFilaFactura());

  controller.init();
}

window.electronAPI.mandar_principal((event, datos) => {
  if (typeof (datos) === "string") {
    controller.getFactura().leerFactura(datos)
      .then((value) => {
        controller.getView().generarTabla(value).forEach((elemento) => {
          elemento[0].addEventListener('click', () => {
            // eliminamos la fila que contiene la x donde se ha hecho click
            elemento[0].closest('tr').remove();
            controller.getFactura().eliminarArticulo(elemento[1]);
            // Este totalizar se ejecuta al hacer click y eliminar una fila de la factura
            this.totalizar();
          })
        })
        // Este totalizar se ejecuta una vez cargada la factura
        controller.totalizar();
      })
      .catch((error) => console.log(error))
  } else {
    controller.altaProducto(datos);
  }
})