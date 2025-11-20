// const fs = require('fs');
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
        // Creamos el fichero de productos vacío en caso que no exista
        return new Promise((resolve, reject) => {
            this.#crearProductosFile()
                .then((value) => {
                    resolve(value);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    // Craerá el fichero de productos vacío en caso que no exista
    #crearProductosFile() {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(FICHERO_PRODUCTOS)) {
                fs.writeFile(FICHERO_PRODUCTOS, '[]', (err) => {
                    if (err) reject(new Error('No se ha podido crear el fichero de productos'));
                    else resolve('');
                });
            }
        });
    }

    // Busca los productos en el fichero FICHERO_PRODUCTOS de manera asincrona cargando el array this.#stock
    buscarProductos() {
        return new Promise(async (resolve, reject) => {
            const promesa = await electronAPI.readFile(FICHERO_PRODUCTOS);

            promesa.then((data) => {
                data.forEach((element) => {
                    let entry = new Producto(element.descripcion, element.precio)
                    this.#stock.push(entry)
                })
                resolve(this.getStockJSON());
            }).catch((err) => {
                reject(err);
            })
        })
    }

    // A partir de la descripcion de un producto devuelve el objeto producto o null si no existe
    getProductByDescripcion(descripcion) {
        if (this.#stock.find(item => item.getDescripcion() === descripcion) == undefined) return null;
        else return this.#stock.find(item => item.getDescripcion() === descripcion);
    }

    // Da de alta un producto tanto en el archivo FICHERO_PRODUCTOS como en el array this.#stock a prtir de una descripción y un precio y devuelve un array de objetos JSON de todo el stock
    altaProductoInStock(descripcion, precio) {

        return new Promise((resolve, reject) => {

            let producto = new Producto(descripcion, precio)

            let yaExiste = false
            this.#stock.forEach((elemento) => {
                if (elemento.getDescripcion() === producto.getDescripcion()) {
                    yaExiste = true
                    reject(new Error('El producto ' + descripcion + ' ya existe'))
                }
            })

            if (!yaExiste) {
                this.#stock.push(producto);

                // Ordeno los productos
                this.#stock.sort();

                fs.writeFile(FICHERO_PRODUCTOS, JSON.stringify(this.getStockJSON()), (err) => {
                    if (err) reject(new Error('No se ha podido guardar el producto'));
                    else resolve(this.getStockJSON());
                })
            }
        });
    }
}
