<<<<<<< HEAD
import Linea from './linea.js';

export default class carrito {

    #lineas // lista de lineas
    #total
    #tabla
    #campos

    constructor(total, tabla, precio, unidades, importe) {
        this.#tabla = tabla; // tbody
        this.#total = total; // tfoot>tr><td[3]
        this.#campos = [precio, unidades, importe];
        this.#lineas = [];
    }

    getCampos = () => this.#campos;

    anadirLinea(producto) {

        // crear nueva fila
        let nuevaFila = document.createElement('tr');

        // añadir producto
        const celdaP = document.createElement('td');
        celdaP.textContent = producto.textContent;
        nuevaFila.append(celdaP);

        // añadir precio, unidades, importe
        this.#campos.forEach((campo) => {
            // crear celda
            const celda = document.createElement('td');
            // le introduzco el valor
            celda.textContent = campo.value;
            // añadir a la fila
            nuevaFila.append(celda);
        });

        // crear y añadir botón de borrar
        const celdaB = document.createElement('td');
        celdaB.innerHTML = "<button class=\"rojo\" type=\"button\" onclick=\"carrito.borrarLinea(this)\">X</button>";
        nuevaFila.append(celdaB);

        // añadir la fila a la tabla
        this.#tabla.append(nuevaFila);
        
        // guardar la fila en el listado de lineas ?
        /*
        const linea = new Linea();
        this.#lineas.push(linea);*/
    }

    borrarLinea(element) {
        let fila = element.parentNode.parentNode;

        this.#tabla.removeChild(fila);
    }

    borrarCesta() {

    }

    actualizar() { // 

    }
=======
import Linea from './linea.js';

export default class carrito {

    #lineas // lista de lineas
    #total
    #tabla
    #campos

    constructor(total, tabla, precio, unidades, importe) {
        this.#tabla = tabla; // tbody
        this.#total = total; // tfoot>tr><td[3]
        this.#campos = [precio, unidades, importe];
        this.#lineas = [];
    }

    getCampos = () => this.#campos;

    anadirLinea(producto) {

        // crear nueva fila
        let nuevaFila = document.createElement('tr');

        // añadir producto
        const celdaP = document.createElement('td');
        celdaP.textContent = producto.textContent;
        nuevaFila.append(celdaP);

        // añadir precio, unidades, importe
        this.#campos.forEach((campo) => {
            // crear celda
            const celda = document.createElement('td');
            // le introduzco el valor
            celda.textContent = campo.value;
            // añadir a la fila
            nuevaFila.append(celda);
        });

        // crear y añadir botón de borrar
        const celdaB = document.createElement('td');
        celdaB.innerHTML = "<button class=\"rojo\" type=\"button\" onclick=\"carrito.borrarLinea(this)\">X</button>";
        nuevaFila.append(celdaB);

        // añadir la fila a la tabla
        this.#tabla.append(nuevaFila);
        
        // guardar la fila en el listado de lineas ?
        /*
        const linea = new Linea();
        this.#lineas.push(linea);*/
    }

    borrarLinea(element) {
        let fila = element.parentNode.parentNode;

        this.#tabla.removeChild(fila);
    }

    borrarCesta() {

    }

    actualizar() { // 

    }
>>>>>>> main
}