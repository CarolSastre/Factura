<<<<<<< HEAD
import Producto from './producto.js';

export default class Linea {

    #desplegable
    #producto // objeto producto
    #campos
    #importe

    constructor (producto, precio, unidades, importe){
        this.#producto = producto;
        this.#campos = [precio, unidades, importe];
        this.#importe = this.getImporte;
    }

    getImporte = () => Number(this.#campos[0].value) * Number(this.#campos[1].value);

    
=======
import Producto from './producto.js';

export default class Linea {

    #desplegable
    #producto // objeto producto
    #campos
    #importe

    constructor (producto, precio, unidades, importe){
        this.#producto = producto;
        this.#campos = [precio, unidades, importe];
        this.#importe = this.getImporte;
    }

    getImporte = () => Number(this.#campos[0].value) * Number(this.#campos[1].value);

    
>>>>>>> main
}