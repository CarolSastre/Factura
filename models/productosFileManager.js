//const fs = require('fs');

const path = "./productos.json";

import { Producto } from './producto.js';

export class ProductosFileManager {

    /*
    leerArchivoProductos(lista) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, buffer) => {
                if (err) reject("Error leyendo el archivo " + path);

                const productos = JSON.parse(buffer.toString());

                Array.from(productos).forEach(prod => {
                    lista.guardarProducto(new Producto(prod.nombre, prod.precio));
                });

                resolve(path);
            })

        })
    }
    */

    guardarArchivoProductos(listaP) {
        const lista = listaP.getProductos();

        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(lista, null, 2), (err) => {
                if (err) reject(new Error("Error escribiendo el archivo " + path));
                resolve(path);
            });
        });
    }
}