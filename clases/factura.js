const fs = require('fs');

import { Compra } from './compra.js';
import { Campos } from './campos.js';
import { ListaProductos } from './listaProductos.js';
import { ProductosFileManager } from './productosFileManager.js';
import { FacturaFileManager } from './facturaFileManager.js';

export class Factura {
    #listaProductos
    #compra
    #campos

    #prodFile
    #facFile

    constructor(tabla, footer, nombreProd, precioProd, desplegableProd, precio, unidades, importe, desplegableFac) {
        this.#listaProductos = new ListaProductos();
        this.#compra = new Compra(tabla, footer);
        this.#campos = new Campos(nombreProd, precioProd, desplegableProd, precio, unidades, importe, desplegableFac, this.#listaProductos);
        this.#prodFile = new ProductosFileManager(this.#listaProductos);
        this.#facFile = new FacturaFileManager();
    }

    anadirProducto() {
        if (this.#campos.anadirProducto()) {
            // guardar la lista de productos
            this.#prodFile.guardarArchivoProductos(this.#listaProductos);
        }
    }

    anadirFila() {
        this.#compra.anadirFila(this.#campos);
    }

    actualizarImporte() {
        this.#campos.actualizarImporte();
    }

    actualizarCamposFila() {
        this.#campos.actualizarCamposFila();
    }

    borrarCesta() {
        this.#compra.borrarCesta();
    }

    leerArchivoProductos() {
        this.#prodFile.leerArchivoProductos(this.#listaProductos);
        this.#campos.actualizarDesplegableProductos();
    }

    crearFactura() {
        const factura = this.#facFile.crearFactura(this.#compra.listarFilas(), this.#compra.getTotal());
        console.log(factura);

        // actualizar desplegable facturas
        this.#campos.actualizarDesplegableFacturas();
        
    }

    mostrarFactura(){
        const opcion = this.#campos.getSelectedOptionFactura();
        this.#facFile.cargarFactura(opcion, this.#compra);
    }
}