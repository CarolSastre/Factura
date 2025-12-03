import { Controller } from './src/controller/controller.js';

const controller = new Controller();

window.onload = () => {
  document.getElementById("btnAltaProducto").addEventListener('click', () => {
    console.log("Hola, este es el main de altaProducto");
    controller.altaProducto()
  });
}