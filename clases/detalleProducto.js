export class DetalleProducto {
    #producto
    #cantidad
    
    constructor(producto, cantidad) {
        this.#producto = producto;
        this.#cantidad = cantidad;
    }

    getProducto = () => this.#producto
    getCantidad = () => this.#cantidad

    getImporte = () => this.#cantidad * this.#producto.getPrecio()
    
    toJSON() {
        return {
            producto: this.#producto,
            cantidad: this.#cantidad,
            importe: this.getImporte()
        }
    }
}