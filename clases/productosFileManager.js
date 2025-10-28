const fs = require('fs');

const path = "./productos.json";

import { ListaProductos } from './listaProductos.js';

export class productosFileManager {
    #listaP

    constructor(){
        this.#listaP = new ListaProductos();
    }

    getLista = () => { return this.#listaP }

    leerArchivoGeek() {
        // abrir archivo
        fs.open(path, 'r', (err, fd) => {
            if (err) console.error("Error abriendo el archivo: " + err.message);

            // leer archivo
            fs.read(fd, (err, bytesRead, buffer) => {
                if (err) console.error("Error leyendo el archivo: " + err.message);

                if (bytesRead > 0) {
                    const productos = JSON.parse(buffer.slice(0, bytesRead).toString());
                    console.log(productos);

                    Array.from(productos).forEach(prod => {
                        console.log(prod);
                        this.#listaP.guardarProducto(prod[0], prod[1]);
                    });

                    console.log(this.#listaP.getProductos);
                }

                // cerrar archivo
                fs.close(fd, (err) => {
                    if (err) console.error("Error al cerrar el archivo: " + err)
                    else console.log("Archivo cerrado con exito");
                });
            });
        });
    }

    guardarArchivoGeek() {
        fs.open(path, 'w', (err, fd) => {
            if (err) {
                return console.error("Error opening file: " + err);
            }
            console.log("File descriptor: " + fd);
            fs.write(fd, (err, resolve) => {
                if (err) {
                    return console.error("Error escribiendo el archivo: " + err);
                }
                console.log("File buffer?: " + resolve);
            });
        });
    }

    /*
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
        */
}