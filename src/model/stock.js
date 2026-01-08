const FICHERO_PRODUCTOS = './productos.json';

import { Producto } from '../model/producto.js';

export class Stock {

    #stock = []  // Lista de los productos disponibles   

    getStock() { return this.#stock }
    getStockJSON() {
        let array = [];

        this.#stock.forEach((elemento) => {
            array.push(elemento.toJSON())
        })

        return array
    }

    init() {
    }

    /**
     * Busca los productos en el fichero productos.json de manera asincrona cargando el array this.#stock
     * @returns Promise - resolve: this.#stock; reject - error
    */
    buscarProductos() {
        this.#stock = []
        return new Promise(async (resolve, reject) => {
            electronAPI.selectProductos()
                .then((value) => {
                    console.log(value);
                    Array.from(value).forEach((element) => {
                        let entry = new Producto(element.descripcion, element.precio)
                        this.#stock.push(entry)
                    })
                    resolve(this.#stock);
                }).catch((err) => {
                    reject(err);
                })
        })
    }

    /**
     * A partir de la descripcion de un producto devuelve el objeto producto o null si no existe
     * @param {String} descripcion 
     * @returns Producto con esa descripción o null
     */
    getProductByDescripcion(descripcion) {
        if (this.#stock.find(item => item.getDescripcion() === descripcion) == undefined) return null;
        else return this.#stock.find(item => item.getDescripcion() === descripcion);
    }

    /**
     * Da de alta un producto tanto en el archivo FICHERO_PRODUCTOS como en el array this.#stock a prtir de una descripción y un precio y devuelve un array de objetos JSON de todo el stock
     * @param {String} descripcion 
     * @param {float} precio 
     * @returns (Promise) resolve - this.#stock
     */
    altaProductoInStock(descripcion, precio) {
        return new Promise((resolve, reject) => {
            let producto = new Producto(descripcion, precio);

            let yaExiste = false
            this.#stock.forEach((elemento) => {
                if (elemento.getDescripcion() === producto.getDescripcion()) {
                    yaExiste = true
                    reject(new Error('El producto ' + descripcion + ' ya existe'))
                }
            })

            if (!yaExiste) {
                this.#stock.push(producto);

                // Ordenar los productos
                this.#stock.sort();
                electronAPI.insertProducto(descripcion, precio)
                    .then((value) => {
                        resolve(this.getStock())
                    })
                    .catch((err) => {
                        reject(err)
                    })
            }
        });
    }
}
