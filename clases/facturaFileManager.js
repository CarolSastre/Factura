const fs = require('fs');
const moment = require('moment');

import { DetalleProducto } from './detalleProducto.js';
import { Producto } from './producto.js';

export class FacturaFileManager {

    crearFactura(listaFilas, totalF) {
        console.log(totalF);
        console.log(listaFilas);

        if (listaFilas.length !== 0) {
            // conseguir fecha actual
            const fechaF = moment().format('YYYY_MM_DD_hh-mm-ss');

            // crear path del archivo
            const path = "Factura_" + fechaF + ".json";

            // guardar datos factura
            const factura = {
                fecha: fechaF,
                total: totalF,
                productos: listaFilas.map((p) => ({
                    nombre: p.getProducto().getNombre(),
                    precio: Number.parseFloat(p.getProducto().getPrecio()),
                    cantidad: Number.parseInt(p.getCantidad())
                }))
            }

            fs.writeFile(path, JSON.stringify(factura, null, 2), (err) => {
                if (err) console.error("Error escribiendo el archivo: " + err.message);
            });
        }
    }

    cargarFactura(path, compra) {
        fs.readFile(path, (err, buffer) => {
            if (err) console.error("Error leyendo el archivo: " + err.message);

            const factura = JSON.parse(buffer.toString());

            console.log(factura);
            const filas = factura.productos;
            Array.from(filas).forEach((f) => {
                // ! en productosFileManager conviertes los datos en objetos pero aquí no
                // ! o creas la clase detalleFila o vuelves a meter todo en método crear fila aquí
            });
            /*
            Array.from(productos).forEach(prod => {
                lista.guardarProducto(new Producto(prod.nombre, prod.precio));
            });

            campos.actualizarDesplegableProductos();
            */
        });
    }

    modificarFactura() {

    }

    borrarFactura() {

    }
}