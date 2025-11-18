const fs = require('fs');
const moment = require('moment');

import { DetalleProducto, Producto } from './producto.js';

export class FacturaFileManager {

    crearFactura(carrito) {
        console.log(carrito.getTabla());

        // conseguir las filas
        const filas = carrito.getTabla().querySelectorAll('tr');

        let productosC = [];

        // guardar cada fila como un objeto producto y la cantidad que le corresponde
        Array.from(filas).forEach(fila => {
            let nombre = fila.children[0].textContent;
            let precio = fila.children[1].textContent;
            let cantidad = fila.children[2].textContent;

            const prod = new Producto(nombre, Number.parseFloat(precio));

            const detalleProd = new DetalleProducto(prod, Number.parseInt(cantidad));

            productosC.push(detalleProd);
        });

        if (productosC.length !== 0) {
            // conseguir fecha actual
            const fechaC = moment().format('YYYY_MM_DD_hh-mm-ss');

            // crear path del archivo
            const path = "Factura_" + fechaC + ".json";

            // guardar los datos

            const totalC = carrito.getTotal();

            // guardar datos factura
            const factura = {
                fecha: fechaC,
                total: totalC,
                productos: productosC.map(p => ({
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
}