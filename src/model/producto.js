export class Producto {

    #descripcion
    #precio

    constructor(descripcion, precio) {
        this.#descripcion = descripcion
        this.#precio = precio
    }

    getDescripcion() { return this.#descripcion  } 
    getPrecio() { return this.#precio  } 

    // tostring() se utiliza para ordenar el array de productos
    toString(){ return this.#descripcion }

    toJSON() {
        return {
            descripcion: this.#descripcion,
            precio: this.#precio
        };
    }
}
