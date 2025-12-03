import { Controller } from './src/controller/controller.js';

const controller = new Controller();

window.onload = () => {
  document.getElementById("btnAltaProducto").addEventListener('click', () => {
    console.log("Hola, este es el controller de altaProducto");

    let producto = {
      description: document.getElementById('productoName').value,
      precio: document.getElementById('productoPrecio').value
    }

    window.electronAPI2.writeFile('./productos.js', producto)
      .then((value) => {
        console.log(value);
      })
      .catch((err) => {
        console.log(err);
      })

  });
}