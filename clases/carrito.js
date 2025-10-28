export class Carrito {
    #tabla
    #footer

    constructor(tabla, footer) {
        this.#tabla = tabla;
        this.#footer = footer;
    }

    actualizarTotal() {
        let total = 0.00;

        const filas = this.#tabla.children;

        Array.from(filas).forEach((tr) => {
            total += Number.parseFloat(tr.children[3].textContent);
        });

        // cambiar contenido del total
        this.#footer.textContent = total + " €";
    }

    anadirFila(formulario) {
        // crear nueva fila
        let nuevaFila = document.createElement('tr');

        // añadir producto
        const celdaP = document.createElement('td');
        celdaP.textContent = formulario.getSelectedOptionNombre();
        nuevaFila.append(celdaP);

        // añadir precio, unidades, importe
        const campos = formulario.getCampos();
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

        this.actualizarTotal();
    }

    borrarCesta() {
        this.#tabla.innerHTML = "";

        this.actualizarTotal();
    }
}