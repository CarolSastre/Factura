import { Controller } from './src/controller/controller.js';

const controller = new Controller();

window.onload = () => {
  document.getElementById("btnAltaProducto").addEventListener('click', () => {
    console.log("Hola, este es el renderer de altaProdunto");
    controller.altaProducto()
  });
}