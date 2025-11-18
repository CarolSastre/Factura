export class Formulario {
    #desplegable
    #campos

    constructor(desplegable, precio, unidades, importe) {
        this.#desplegable = desplegable;
        this.#campos = [precio, unidades, importe];
    }

    getDesplegable = () => this.#desplegable;
    getCampos = () => this.#campos;

    cargarProductos(lista) {
<<<<<<< HEAD:clases/formularioLinea.js
        console.log("Ha entrado en formulario.cargarProductos");

        console.log(lista.getProductos());

=======
>>>>>>> origin/main:SEGURIDAD/formularioLinea.js
        this.#desplegable.innerHTML = "<option selected=\"selected\">Seleccione un producto...</option>";

        lista.getProductos().forEach((producto) => {
            const opcion = document.createElement('option');
            opcion.value = producto.getNombre();
            opcion.textContent = producto.getNombre();

            this.#desplegable.append(opcion);
        });
    }

    /**
     * Devuelve el valor de la opción seleccionada
     * @returns string
     */
    getSelectedOptionNombre() {
<<<<<<< HEAD:clases/formularioLinea.js
        console.log("Ha entrado en formulario.getSelectedOptionNombre");

=======
>>>>>>> origin/main:SEGURIDAD/formularioLinea.js
        const indice = this.#desplegable.selectedIndex;
        return this.#desplegable.options[indice].value;
    }

<<<<<<< HEAD:clases/formularioLinea.js
    actualizarCampos(lista) {
        console.log("Ha entrado en formulario.actualizarCampos");

        const nombre = this.getSelectedOptionNombre();

        const producto = lista.buscarProducto(nombre);

=======
    /**
     * 
     * @param lista 
     */
    actualizarCampos(lista) {
        const nombre = this.getSelectedOptionNombre();

>>>>>>> origin/main:SEGURIDAD/formularioLinea.js
        // inhabilitar 'precio' e 'importe'
        this.#campos[0].disabled = true;
        this.#campos[2].disabled = true;

<<<<<<< HEAD:clases/formularioLinea.js
        // asignar valores en los campos
        this.#campos[0].value = producto.getPrecio();
        this.#campos[1].value = "1";
=======
        if (nombre === "Seleccione un producto...") {
            this.#campos[0].value = "";
            this.#campos[1].value = "";
        } else {
            const producto = lista.buscarProducto(nombre);

            // asignar valores en los campos
            this.#campos[0].value = producto.getPrecio() + " €";
            this.#campos[1].value = 1;
        }
>>>>>>> origin/main:SEGURIDAD/formularioLinea.js

        this.actualizarImporte();
    }

    actualizarImporte() {
<<<<<<< HEAD:clases/formularioLinea.js
        console.log("Ha entrado en formulario.actualizarImporte");

=======
>>>>>>> origin/main:SEGURIDAD/formularioLinea.js
        const result = Number.parseFloat(this.#campos[0].value) * Number.parseFloat(this.#campos[1].value);
        if (isNaN(result)) { // esto puede ser funcional
            this.#campos[2].value = "";
        } else {
<<<<<<< HEAD:clases/formularioLinea.js
            this.#campos[2].value = result;
=======
            this.#campos[2].value = result + " €";
        }
    }

    toJSON() {
        return {
>>>>>>> origin/main:SEGURIDAD/formularioLinea.js
        }
    }
}