const fs = require('fs');

import { Producto } from './producto.js';

export class Factura {
    // div alta
    #camposProducto

    #lista_productos
    #carrito
    #formulario

    #path

    constructor(nombreProd, precioProd, lista, carrito, formulario) {
        this.#camposProducto = [nombreProd, precioProd];
        this.#lista_productos = lista;
        this.#carrito = carrito;
        this.#formulario = formulario;
        this.#path = "./productos.json";
    }

    limpiarCampos() {
        this.#camposProducto[0].value = "";
        this.#camposProducto[1].value = "";
    }

    anadirProducto() {
        const nombre = this.#camposProducto[0].value;
        const precio = Number.parseFloat(this.#camposProducto[1].value);

        if (this.#lista_productos.buscarProducto(nombre) !== undefined) { // ya existe 
            alert('El producto ya existe en la lista.');
        } else { // no existe
            // guarda el producto en la lista
            this.#lista_productos.guardarProducto(new Producto(nombre, precio));

            // añade el producto en el desplegable
            this.#formulario.cargarProductos(this.#lista_productos);

            this.limpiarCampos();

            // guardar la lista de productos
            this.guardarArchivoProductos();
        }
    }

    leerArchivoProductos() {
        // leer archivo
        fs.readFile(this.#path, (err, buffer) => {
            if (err) console.error("Error leyendo el archivo: " + err.message);

            const productos = JSON.parse(buffer.toString());

            Array.from(productos).forEach(prod => {
                console.log("Nombre: " + prod.nombre);
                this.#lista_productos.guardarProducto(new Producto(prod.nombre, prod.precio));
            });

            console.log("Lista de productos: " + this.#lista_productos);

            this.#formulario.cargarProductos(this.#lista_productos);
        });
    }

    guardarArchivoProductos() {
        const lista = this.#lista_productos.getProductos();

        fs.writeFile(this.#path, JSON.stringify(lista, null, 2), (err) => {
            if (err) console.error("Error escribiendo el archivo: " + err.message);
        });
    }
}