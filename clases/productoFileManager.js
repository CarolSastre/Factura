const fs = require('fs');

const path = "../productos.json";

import { Producto } from './producto.js';

export class productoFileManager {
    leerArchivo() {
        console.log(path);
        fs.access(path, fs.constants.F_OK,
            new Promise((resolve, reject) => {
                fs.readFile(path, fs.constants.F_OK,
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

    guardarArchivo(data) {
        fs.access(path, fs.constants.F_OK,
            new Promise((resolve, reject) => {
                fs.writeFile(path, JSON.stringify(data),
                    new Promise((resolve, reject) => {
                        resolve("resolve en writeFile");
                        reject("reject en writeFile");
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
}