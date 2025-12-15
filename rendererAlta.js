import { View } from './src/view/view.js';

const view = new View();

window.onload = () => {
  document.getElementById("btnAltaProducto").addEventListener('click', () => {
    let producto = {
      descripcion: document.getElementById('productoName').value,
      precio: document.getElementById('productoPrecio').value
    }
    
    window.electronAPI2.anadirProducto(producto);

    // Vacia campos del formulario de alta
    vaciarCampos();
  });
}

const vaciarCampos = () => {
  document.getElementById('productoName').value = '';
  document.getElementById('productoPrecio').value = '';
}