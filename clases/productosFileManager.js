const fs = require('fs');

const path = "./productos.json";

import { Producto } from './producto.js';

export class ProductosFileManager {

    leerArchivoProductos(campos, lista) {
        let promesa = new Promise((resolve) => {
            resolve(
                fs.readFile(path, (err, buffer) => {
                    if (err) console.error("Error leyendo el archivo: " + err.message);

                    const productos = JSON.parse(buffer.toString());

                    Array.from(productos).forEach(prod => {
                        lista.guardarProducto(new Producto(prod.nombre, prod.precio));
                    });
                })
            )
        })

        promesa.then(
            campos.actualizarDesplegableProductos(),
            console.log("Archivo de productos leído")
        ).catch((err) => {
            console.log(err)
        })
    }

    guardarArchivoProductos(listaP) {
        const lista = listaP.getProductos();

        let promesa = new Promise((resolve) => {
            resolve(
                fs.writeFile(path, JSON.stringify(lista, null, 2), (err) => {
                    if (err) console.error("Error escribiendo el archivo: " + err.message);
                })
            )
        })

        promesa.then(
            console.log("Archivo de productos guardado")
        ).catch((err) => {
            console.log(err)
        })
    }
}