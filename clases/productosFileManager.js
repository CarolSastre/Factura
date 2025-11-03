const fs = require('fs');

const path = "./productos.json";

import { Producto } from './producto.js';

export class ProductosFileManager {

    leerArchivoProductos(campos, lista) {
        // leer archivo
        fs.readFile(path, (err, buffer) => {
            if (err) console.error("Error leyendo el archivo: " + err.message);

            const productos = JSON.parse(buffer.toString());

            Array.from(productos).forEach(prod => {
                lista.guardarProducto(new Producto(prod.nombre, prod.precio));
            });

            campos.actualizarDesplegableProductos();
        });
    }

    guardarArchivoProductos(listaP) {
        const lista = listaP.getProductos();

        fs.writeFile(path, JSON.stringify(lista, null, 2), (err) => {
            if (err) console.error("Error escribiendo el archivo: " + err.message);
        });
    }
}