export class Producto {
    #nombre;
    #precio;    

    constructor (nombre, precio) {
        this.#nombre = nombre;
        this.#precio = precio;
    }

    getNombre = () => this.#nombre;
    getPrecio = () => this.#precio;

    toJSON(){
        return {
            nombre: this.#nombre,
            precio: this.#precio
        }
    }
}

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