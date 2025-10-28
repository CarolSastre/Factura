const fs = require('fs');

import { Producto } from './producto.js';

export class ListaProductos {
    #productos
    #path

    constructor() {
        this.#productos = [];
        this.#path = "./productos.json";
    }

    getProductos = () => this.#productos;

    buscarProducto(nombre) { // buscar por nombre???
        const producto = this.#productos.find(p => p.getNombre() === nombre);
        if (producto !== undefined) { return producto }
        else { return undefined }
    }

    guardarProducto(nombre, precio) {
        this.#productos.push(new Producto(nombre, precio));
    }

    leerArchivo() {
        // abrir archivo
        fs.open(this.#path, 'r', (err, fd) => {
            if (err) console.error("Error abriendo el archivo: " + err.message);

            // leer archivo
            fs.read(fd, (err, bytesRead, buffer) => {
                if (err) console.error("Error leyendo el archivo: " + err.message);

                if (bytesRead > 0) {
                    const productos = JSON.parse(buffer.slice(0, bytesRead).toString());
                    console.log(productos);

                    Array.from(productos).forEach(prod => {
                        console.log("Nombre: " + prod.nombre);
                        this.guardarProducto(prod.nombre, prod.precio);
                    });

                    console.log("Lista: " + this.#productos);

                    // TODO: actualizar campos de formulario linea
                }

                // cerrar archivo
                fs.close(fd, (err) => {
                    if (err) console.error("Error al cerrar el archivo: " + err)
                    else console.log("Archivo cerrado con exito");
                });
            });
        });
    }

    // TODO: terminar este método
    guardarArchivo() {
        fs.open(path, 'w', (err, fd) => {
            if (err) {
                return console.error("Error opening file: " + err);
            }
            console.log("File descriptor: " + fd);
            fs.write(fd, (err, resolve) => {
                if (err) {
                    return console.error("Error escribiendo el archivo: " + err);
                }
                console.log("File buffer?: " + resolve);
            });
        });
    }
}