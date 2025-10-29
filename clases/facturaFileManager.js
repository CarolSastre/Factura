const fs = require('fs');
const moment = require('moment');

import { DetalleProducto, Producto } from './producto.js';

export class FacturaFileManager {

    crearFactura(carrito){
        console.log(carrito.getTabla());

        const filas = carrito.getTabla().querySelectorAll('tr');

        let productos = [];

        Array.from(filas).forEach(fila => {
            let nombre = fila.children[0].textContent;
            let precio = fila.children[1].textContent;
            let cantidad = fila.children[2].textContent;

            const prod = new Producto(nombre, precio);
            
            const detalleProd = new DetalleProducto(prod, cantidad);

            productos.push(detalleProd);
        });

        console.log(productos);
    }
    // TODO: termina, ostias
}