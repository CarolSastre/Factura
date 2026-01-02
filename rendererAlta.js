window.onload = () => {
  document.getElementById("btnAltaProducto").addEventListener('click', () => {
    try {
      // vacía cualquier mensaje de error
      document.getElementById("error").textContent = '';

      let precio = document.getElementById('productoPrecio').value;

      // confirma que el precio sea válido
      if (precio === '') throw new Error("El precio no puede estar vacío");
      else if (isNaN(precio)) throw new Error("El precio debe ser un número");

      let producto = {
        descripcion: document.getElementById('productoName').value,
        precio: precio
      }

      // manda el producto a la ventana principal
      window.electronAPI2.anadirProducto(producto);
    } catch (error) {
      // muestra un mensaje en la ventana de alta de producto
      document.getElementById("error").textContent = error;
    } finally {
      // Vacia campos del formulario de alta
      document.getElementById('productoName').value = '';
      document.getElementById('productoPrecio').value = '';
    }
  });
}