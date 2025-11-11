const fs = require('fs');

import { Producto } from './producto.js';

export class Campos {
    #desplegableProd
    #camposFila
    #desplegableFac
    #camposProducto
    #listaProductos

    constructor(nombreP, precioP, desplegableProd, precio, unidades, importe, desplegableFac, listaProductos) {
        this.#camposProducto = [nombreP, precioP];
        this.#desplegableProd = desplegableProd;
        this.#camposFila = [precio, unidades, importe];
        this.#desplegableFac = desplegableFac;
        this.#listaProductos = listaProductos;
    }

    getDesplegableProd = () => this.#desplegableProd;
    getCamposFila = () => this.#camposFila;
    getListaProductos = () => this.#listaProductos;

    limpiarCamposProducto() {
        this.#camposProducto[0].value = "";
        this.#camposProducto[1].value = "";
    }

    anadirProducto() {
        const nombre = this.#camposProducto[0].value;
        const precio = Number.parseFloat(this.#camposProducto[1].value);

        if (this.#listaProductos.buscarProducto(nombre) !== undefined) { // ya existe 
            alert('El producto ya existe en la lista.');

            return false;
        } else { // no existe
            // guarda el producto en la lista
            this.#listaProductos.guardarProducto(new Producto(nombre, precio));

            // añade el producto en el desplegable
            this.actualizarDesplegableProductos();
            this.limpiarCamposProducto();

            return true;
        }
    }

    actualizarDesplegableProductos() {
        this.#desplegableProd.innerHTML = "<option selected=\"selected\">Seleccione un producto...</option>";

        this.#listaProductos.getProductos().forEach((producto) => {
            const opcion = document.createElement('option');
            opcion.value = producto.getNombre();
            opcion.textContent = producto.getNombre();

            this.#desplegableProd.append(opcion);
        });
    }

    actualizarDesplegableFacturas() {
        let promesa = new Promise((resolve) => {
            resolve(
                fs.glob('Factura_*.json', (err, matches) => {
                    if (err) console.error("Error buscar los archivos: " + err.message);

                    this.#desplegableFac.innerHTML = "<option selected=\"selected\">Seleccione una factura...</option>";

                    matches.forEach((factura) => {
                        const opcion = document.createElement('option');
                        opcion.value = factura;
                        // separa el nombre del archivo de la extensión .json
                        opcion.textContent = factura.split(".")[0];

                        this.#desplegableFac.append(opcion);
                    })
                })
            )
        })

        promesa.then(
            console.log("Facturas leídas correctamente")
        ).catch((err) => {
            console.log(err)
        })
    }

    /**
     * Devuelve el valor de la opción seleccionada
     * @returns string
     */
    getSelectedOptionNombre() {
        const indice = this.#desplegableProd.selectedIndex;
        return this.#desplegableProd.options[indice].value;
    }
    /**
     * Devuelve el valor de la opción seleccionada
     * @returns string
     */
    getSelectedOptionFactura() {
        const indice = this.#desplegableFac.selectedIndex;
        return this.#desplegableFac.options[indice].value;
    }

    actualizarCamposFila() {
        const nombre = this.getSelectedOptionNombre();

        // inhabilitar 'precio' e 'importe'
        this.#camposFila[0].disabled = true;
        this.#camposFila[2].disabled = true;

        if (nombre === "Seleccione un producto...") {
            this.#camposFila[0].value = "";
            this.#camposFila[1].value = "";
        } else {
            const producto = this.#listaProductos.buscarProducto(nombre);

            // asignar valores en los camposFila
            this.#camposFila[0].value = producto.getPrecio().toFixed(2) + " €";
            this.#camposFila[1].value = 1;
        }

        this.actualizarImporte();
    }

    actualizarImporte() {
        const result = Number.parseFloat(this.#camposFila[0].value) * Number.parseFloat(this.#camposFila[1].value);
        if (isNaN(result)) {
            this.#camposFila[2].value = "";
        } else {
            this.#camposFila[2].value = result.toFixed(2) + " €";
        }
    }
}