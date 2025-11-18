<<<<<<< HEAD
export class Producto {
    #nombre;
    #precio;    

    constructor (nombre, precio) {
        this.#nombre = nombre;
        this.#precio = precio;
    }

    getNombre = () => this.#nombre;
    getPrecio = () => this.#precio;
=======
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
>>>>>>> origin/main
}