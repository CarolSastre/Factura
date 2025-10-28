const fs = require('fs');

import { valCamposProducto } from './validar.js';

export class Factura {
    // div alta
    #camposProducto

    #lista_productos
    #carrito
    #formulario

    constructor(nombreProd, precioProd, lista, carrito, formulario) {
        this.#camposProducto = [nombreProd, precioProd];
        this.#lista_productos = lista;
        this.#carrito = carrito;
        this.#formulario = formulario;
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
            /*
                // guarda el producto en la lista
                this.#lista_productos.guardarProducto(nombre, precio);
    
                // añade el producto en el desplegable
                this.#formulario.cargarProductos(this.#lista_productos);
    
                this.limpiarCampos();
            */
            try {
                valCamposProducto(nombre, precio);

                // guarda el producto en la lista
                this.#lista_productos.guardarProducto(nombre, precio);

                // añade el producto en el desplegable
                this.#formulario.cargarProductos(this.#lista_productos);

            } catch (error) {
                alert(error.nombre + ": " + error.message);
                console.log(error.stack);
            }
            this.limpiarCampos();
        }
    }
}