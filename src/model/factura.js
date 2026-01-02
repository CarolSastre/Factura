import { Articulo } from './articulo.js';
import { Producto } from './producto.js';

export class Factura {

    // Gestiona una factura

    #cesta = []; // Lista de articulos de la cesta
    #importeTotal = 0;

    constructor() {
    }

    init() {

    }

    getImporteTotal() { return this.#importeTotal }
    getCesta() { return this.#cesta }
    getCestaJSON() {
        let array = [];

        this.#cesta.forEach((elemento) => {
            array.push(elemento.toJSON())
        })

        return array
    }

    /**
     * Recibe en accion si debe guardarse en un fichero nuevo generando el nombre (accion=0) o en el mismo fichero (accion=1), entonces el nombre viene en el campo name
     * @param {String} name
     * @returns (Promise) resolve - String vacío
     */
    guardarFactura(name = "") {
        return new Promise((resolve, reject) => {
            let arrayArticulos = []

            this.#cesta.forEach((elemento) => {
                arrayArticulos.push(elemento.toJSON())
            })

            electronAPI.writeFile(name, arrayArticulos)
                .then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
        })
    }

    /**
     * Creamos o modificamos el articulo en la cesta
     * @param {String} descripcion 
     * @param {String} precio 
     * @param {String} unidades 
     */
    anadirArticulo(descripcion, precio, unidades) {
        let articulo = new Articulo(new Producto(descripcion, precio), unidades);

        let existeArticulo = false
        this.#cesta.forEach((elemento) => {
            if (articulo.getProducto().getDescripcion() === elemento.getProducto().getDescripcion()) {
                elemento.setUnidades(parseInt(elemento.getUnidades()) + parseInt(articulo.getUnidades()))
                existeArticulo = true;
            }
        })
        
        if (!existeArticulo) {
            this.#cesta.push(articulo);
        }
    }

    #removeItemOnce(arr, articulo) {
        let indice = -1;

        arr.forEach((elemento, index) => {
            if (elemento.getProducto().getDescripcion() == articulo.descripcion) indice = index;
        })

        if (indice > -1) {
            arr.splice(indice, 1);
        }
        return arr;
    }

    eliminarArticulo(articulo) { this.#cesta = this.#removeItemOnce(this.#cesta, articulo) }

    totalizar() {
        this.#importeTotal = 0
        this.#cesta.forEach((elemento) => {
            let precio = elemento.getProducto().getPrecio();
            let unidades = elemento.getUnidades();
            this.#importeTotal += unidades * precio;
        })
    }

    vaciarArticulos() { this.#cesta = [] }

    /**
     * Lee el contenido del fichero de la factura y devuelve la lista de articulos como array de objetos JSON
     * @param {String} name 
     * @returns (Promise) resolve - JSON de la compra
     */
    leerFactura(name) {
        return electronAPI.readFile(name)
            .then((data) => {
                console.log(data);
                JSON.parse(data).forEach((elemento) => {
                    this.anadirArticulo(elemento.descripcion, elemento.precio, elemento.unidades)
                })
                return this.getCestaJSON();
            })
    }
}
