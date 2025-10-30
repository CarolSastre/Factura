const fs = require('fs');

const path = "./productos.json";

import { Producto } from './producto.js';

export class ProductosFileManager {
    #listaP
    #form

    constructor(lista_productos, formulario){
        this.#listaP = lista_productos;
        this.#form = formulario;
    }

    leerArchivoProductos() {
        // leer archivo
        fs.readFile(path, (err, buffer) => {
            if (err) console.error("Error leyendo el archivo: " + err.message);

            const productos = JSON.parse(buffer.toString());

            Array.from(productos).forEach(prod => {
                this.#listaP.guardarProducto(new Producto(prod.nombre, prod.precio));
            });

            this.#form.cargarProductos(this.#listaP);
        });
    }

    guardarArchivoProductos() {
        const lista = this.#listaP.getProductos();

        fs.writeFile(path, JSON.stringify(lista, null, 2), (err) => {
            if (err) console.error("Error escribiendo el archivo: " + err.message);
        });
    }
}