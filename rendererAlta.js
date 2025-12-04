import { View } from './src/view/view.js';

const view = new View();

window.onload = () => {
  document.getElementById("btnAltaProducto").addEventListener('click', () => {
    console.log("Hola, este es el controller de altaProducto");

    let producto = {
      descripcion: document.getElementById('productoName').value,
      precio: document.getElementById('productoPrecio').value
    }

    window.electronAPI2.altaProducto(producto)
      .then((value) => {
        console.log(value);

        view.cargarProductos(value);

        // Quita un posible mensaje de error anterior
        view.muestraErrorProducto('');
      })
      .catch((error) => {
        view.muestraErrorProducto(error);
      });

    // Vacia campos del formulario de alta
    vaciarCampos();
  });
}

const vaciarCampos = () => {
  document.getElementById('productoName').value = '';
  document.getElementById('productoPrecio').value = '';
}