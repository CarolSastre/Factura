const fs = require('fs');

const path = "../productos.json";

import { Producto } from './producto.js';

export class productoFileManager {

    leerArchivo() {
        fs.access(path,
            new Promise((resolve, reject) => {
                fs.readFile(path,
                    new Promise((resolve, reject) => {
                        resolve("resolve en readFile");
                        reject("reject en readFile");
                    })
                );
                resolve("resolve en access");
                reject("reject en access");
            })
            .then((resolve) => {
                console.log(resolve);
            })
            .catch((error) => {
                console.log(error);
            })
        )
    }

    guardarArchivo() {
        fs.access(path,
            new Promise((resolve, reject) => {
                fs.writeFile(path,
                    new Promise((resolve, reject) => {
                        console.log(hola);
                    })
                )
            })
        )
    }
}