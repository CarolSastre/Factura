export class Articulo {

    // Articulo indica que producto en qué cantidad se ha añadido a la cesta
    #producto
    #unidades

    constructor(producto, unidades) {
        this.#producto = producto
        this.#unidades = unidades
    }

    getProducto() { return this.#producto}
    getUnidades() { return this.#unidades}
    setUnidades(value) { this.#unidades = value}

    toJSON() {
        return {
            descripcion : this.#producto.getDescripcion(),
            precio : this.#producto.getPrecio(),
            unidades : this.#unidades,
            importe : parseFloat(this.#producto.getPrecio()) * parseInt(this.#unidades)
        }
    }
}
