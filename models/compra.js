const fs = require('fs');
const moment = require('moment');

import { Producto } from "./producto.js";
import { DetalleProducto } from "./detalleProducto.js";

export class Compra {
    #tabla
    #footer

    constructor(tabla, footer) {
        this.#tabla = tabla;
        this.#footer = footer;
    }

    getTabla = () => this.#tabla
    getTotal = () => Number.parseFloat(this.#footer.textContent)

    actualizarTotal() {
        let total = 0.00;

        const filas = this.#tabla.children;

        Array.from(filas).forEach((tr) => {
            total += Number.parseFloat(tr.children[3].textContent);
        });

        // cambiar contenido del total
        this.#footer.textContent = total.toFixed(2) + " €";
    }

    anadirFila(nombre, campos) {
        const fila = this.existeFila(nombre);
        
        if (!fila) { // no existe
            // crear nueva fila
            let nuevaFila = document.createElement('tr');

            // añadir producto
            const celdaP = document.createElement('td');
            celdaP.textContent = nombre;
            nuevaFila.append(celdaP);

            // añadir precio, unidades, importe
            campos.forEach((campo) => {
                // crear celda
                const celda = document.createElement('td');
                // introducir el valor
                celda.textContent = campo.value;
                celda.setAttribute('align', 'right');
                // añadir a la fila
                nuevaFila.append(celda);
            });

            // crear y añadir botón de borrar
            const celdaB = document.createElement('td');
            const boton = document.createElement('button');
            boton.textContent = "X";
            boton.setAttribute('class', 'rojo');
            boton.setAttribute('type', 'button');

            boton.onclick = (e) => {
                let fila = e.srcElement.parentNode.parentNode;

                fila.parentNode.removeChild(fila);

                this.actualizarTotal();
            }

            celdaB.append(boton);
            nuevaFila.append(celdaB);

            // añadir la fila a la tabla
            this.#tabla.append(nuevaFila);
        } else { // existe
            let nuevaCantidad = Number.parseInt(fila.children[2].textContent);  //cantidad
            nuevaCantidad += Number.parseFloat(campos[1].value);

            let nuevoImporte = nuevaCantidad * Number.parseFloat(campos[0].value); // importe

            fila.children[2].textContent = nuevaCantidad;
            fila.children[3].textContent = nuevoImporte.toFixed(2) + " €";
        }

        this.actualizarTotal();
    }

    existeFila(nombre) {
        const filas = this.#tabla.querySelectorAll('tr');
        const result = Array.from(filas).find((fila) => fila.children[0].textContent === nombre);
        return result;
    }

    borrarCesta() {
        this.#tabla.innerHTML = "";

        this.actualizarTotal();
    }

    listarFilas() {
        // conseguir las filas
        const filas = this.#tabla.querySelectorAll('tr');

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

        return productosC;
    }
}