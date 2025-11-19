import { Compra } from './compra.js';
import { Campos } from './campos.js';
import { ListaProductos } from './listaProductos.js';
import { ProductosFileManager } from './productosFileManager.js';
import { FacturaFileManager } from './facturaFileManager.js';

const moment = require('moment');

export class Factura {
    #listaProductos
    #compra
    #campos

    #prodFile
    #facFile

    constructor(tabla, footer, nombreProd, precioProd, desplegableProd, precio, unidades, importe, desplegableFac) {
        this.#listaProductos = new ListaProductos();
        this.#compra = new Compra(tabla, footer);
        this.#campos = new Campos(nombreProd, precioProd, desplegableProd, precio, unidades, importe, desplegableFac, this.#listaProductos);
        this.#prodFile = new ProductosFileManager();
        this.#facFile = new FacturaFileManager();
    }

    anadirProducto() {
        if (this.#campos.anadirProducto()) {
            // guardar la lista de productos
            let promesa = this.#prodFile.guardarArchivoProductos(this.#listaProductos);

            promesa.then((resolve) => {
                console.log("Archivo " + resolve + " guardado");
            }
            ).catch((err) => {
                console.log(err);
            })
        }
    }

    anadirFila() {
        const nombre = this.#campos.getSelectedOptionNombre();

        // confirma que hay un producto seleccionado
        if (nombre !== "Seleccione un producto...") {
            const campos = this.#campos.getCamposFila();

            this.#compra.anadirFila(nombre, campos);
        }
    }

    actualizarImporte() {
        this.#campos.actualizarImporte();
    }

    actualizarCamposFila() {
        this.#campos.actualizarCamposFila();
    }

    borrarCesta() {
        this.#compra.borrarCesta();
    }

    leerArchivoProductos() {
        let promesa = this.#prodFile.leerArchivoProductos(this.#listaProductos);

        promesa.then((resolve) => {
            this.#campos.actualizarDesplegableProductos();
            console.log("Archivo " + resolve + " leído");
        }
        ).catch((err) => {
            console.log(err)
        })
    }

    actualizarDesplegableFacturas() {
        let promesa = this.#campos.actualizarDesplegableFacturas();

        promesa.then((resolve) => {
            console.log(resolve)
        }
        ).catch((err) => {
            console.log(err)
        });
    }

    crearFactura() {
        const listaFilas = this.#compra.listarFilas();

        // confirma que la lista de la compra no esté vacía
        if (listaFilas.length !== 0) {
            // conseguir fecha actual
            const fechaF = moment().format('YYYYMMDD-hhmmssa');
            const totalF = this.#compra.getTotal();

            // crear path del archivo
            const path = "Factura_" + fechaF + ".json";

            // envía el nombre del archivo y los datos que almacena(fecha, total de la factura y las filas)
            let promesa = this.#facFile.escribirFactura(path, fechaF, totalF, listaFilas);

            promesa.then((resolve) => {
                this.#campos.actualizarDesplegableFacturas();
                this.#compra.borrarCesta();
                console.log("Archivo " + resolve + " creado");
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    mostrarFactura() {
        // se asegura de borrar cualquier dato presente
        this.#compra.borrarCesta();

        // consigue el nombre de la factura
        const path = this.#campos.getSelectedOptionFactura();

        // confirma que se ha seleccionado una factura
        if (path !== "Seleccione una factura...") {
            const path = this.#campos.getSelectedOptionFactura();
            let promesa = this.#facFile.cargarFactura(path, this.#compra);

            promesa.then((resolve) => {
                this.#compra.actualizarTotal();
                console.log("Archivo " + resolve + " cargado");
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    modificarFactura() {
        // utiliza el mismo nombre de la factura seleccionada
        const path = this.#campos.getSelectedOptionFactura();

        // confirma que se ha seleccionado una factura
        if (path !== "Seleccione una factura...") {
            const listaFilas = this.#compra.listarFilas();
            const totalF = this.#compra.getTotal();

            // separa el nombre del archivo de la extensión .json y de "Factura_"
            const fechaF = path.split(".")[0].split("_")[1];

            let promesa = this.#facFile.escribirFactura(path, fechaF, totalF, listaFilas);

            promesa.then((resolve) => {
                this.#campos.actualizarDesplegableFacturas();
                this.#compra.borrarCesta();
                console.log("Archivo " + resolve + " modificado");
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    eliminarFactura() {
        const path = this.#campos.getSelectedOptionFactura();

        // confirmar que se ha seleccionado una factura
        if (path !== "Seleccione una factura...") {
            let promesa = this.#facFile.eliminarFactura(path);

            promesa.then((resolve) => {
                this.#campos.actualizarDesplegableFacturas();
                this.#compra.borrarCesta();
                console.log("Archivo " + resolve + " eliminado");
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}