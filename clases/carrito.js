const fs = require('fs');
const moment = require('moment');

export class Carrito {
    #tabla
    #footer

    constructor(tabla, footer) {
        this.#tabla = tabla;
        this.#footer = footer;
    }

    getTabla = () => this.#tabla

    actualizarTotal() {
        let total = 0.00;

        const filas = this.#tabla.children;

        Array.from(filas).forEach((tr) => {
            total += Number.parseFloat(tr.children[3].textContent);
        });

        // cambiar contenido del total
        this.#footer.textContent = total.toFixed(2) + " €";
    }

    anadirFila(formulario) {
        const campos = formulario.getCampos();

        const nombre = formulario.getSelectedOptionNombre();

        const fila = this.existeProducto(nombre);
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
                // le introduzco el valor
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

    existeProducto(nombre) {
        const filas = this.#tabla.querySelectorAll('tr');
        const result = Array.from(filas).find((fila) => fila.children[0].textContent === nombre);
        return result;
    }

    borrarCesta() {
        this.#tabla.innerHTML = "";

        this.actualizarTotal();
    }

    toJSON() {
        return {

        }
    }
}