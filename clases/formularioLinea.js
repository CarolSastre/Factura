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
        const indice = this.#desplegable.selectedIndex;
        return this.#desplegable.options[indice].value;
    }

    /**
     * 
     * @param lista 
     */
    actualizarCampos(lista) {
        const nombre = this.getSelectedOptionNombre();

        const producto = lista.buscarProducto(nombre);

        // inhabilitar 'precio' e 'importe'
        this.#campos[0].disabled = true;
        this.#campos[2].disabled = true;

        // asignar valores en los campos
        this.#campos[0].value = producto.getPrecio() +" €";
        this.#campos[1].value = 1;

        this.actualizarImporte();
    }

    actualizarImporte() {
        const result = Number.parseFloat(this.#campos[0].value) * Number.parseFloat(this.#campos[1].value);
        if (isNaN(result)) { // esto puede ser funcional
            this.#campos[2].value = "";
        } else {
            this.#campos[2].value = result + " €";
        }
    }

    toJSON(){
        return {
        }
    }
}