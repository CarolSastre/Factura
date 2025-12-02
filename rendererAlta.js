import { Controller } from './src/controller/controller.js';

const controller = new Controller();

window.onload = () => {
  document.getElementById("btnAltaProducto").addEventListener('click', () => controller.altaProducto());
}