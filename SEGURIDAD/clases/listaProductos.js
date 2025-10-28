import { Producto } from './producto.js';

export class ListaProductos {
    #productos

    constructor() {
        this.#productos = [];
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
}