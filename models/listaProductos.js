export class ListaProductos {
    #productos

    constructor() {
        this.#productos = [];
    }

    getProductos = () => this.#productos;

    buscarProducto(nombre) {
        const producto = this.#productos.find(p => p.getNombre() === nombre);
        if (producto !== undefined) { return producto }
        else { return undefined }
    }

    guardarProducto(producto) {
        this.#productos.push(producto);
    }
}