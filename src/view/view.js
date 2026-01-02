export class View {

    // Often used elements
    #desplegableProducto;
    #desplegableFactura;
    #btnModificarFactura
    #btnEliminarFactura

    init() {

    }

    constructor() {
        this.#desplegableProducto = document.getElementById("producto");
        this.#desplegableFactura = document.getElementById("factura");
        this.#btnModificarFactura = document.getElementById("btnModificarFactura")
        this.#btnEliminarFactura = document.getElementById("btnEliminarFactura")
    }

    /**
     * Obtenemos un objeto JSON con los datos que figuran en los input para ser introducidos en una fila
     * @returns Objeto JSON del producto
     */
    getDatosArticulo() {
        return {
            descripcion: this.getSelectedProducto(),
            precio: document.getElementById('precio').value,
            unidades: document.getElementById('unidades').value,
        }
    }

    /**
     * @returns La descripcion del articulo seleccionado
     */
    getSelectedProducto() {
        return this.#desplegableProducto.options[this.#desplegableProducto.selectedIndex].textContent;
    }

    /**
     * Obtenemos el nombre de la factura seleccionada o '' si no hay ninguna ademas de activar o no botones
     * @returns String con la ruta a la factura o un string vacío
     */
    getSelectedFactura() {
        if (this.#desplegableFactura.selectedIndex == 0) {
            this.#btnModificarFactura.disabled = 'disabled';
            this.#btnEliminarFactura.disabled = 'disabled';
            return '';
        }
        else {
            this.#btnModificarFactura.removeAttribute('disabled');
            this.#btnEliminarFactura.removeAttribute('disabled');
            return "./facturas/" + this.#desplegableFactura.options[this.#desplegableFactura.selectedIndex].textContent; // ! <-----------------
        }
    }
    
    /**
     * Carga el desplegable de productos a partir de un array de productos en formato JSON
     * @param {JSON[]} productos
     */
    cargarProductos(productos) {
        this.#desplegableProducto.innerHTML = '<option>Seleccione un producto...</option>';

        Array.from(productos).forEach((elemento, index) => {
            let option = document.createElement("option");
            option.value = elemento.getDescripcion();
            option.textContent = elemento.getDescripcion();
            this.#desplegableProducto.append(option);
        })
    }

    /**
     * A partir de un array de archivos carga el desplegable
     * @param {Array} archivos 
     */
    cargarFacturas(archivos) {
        document.getElementById('factura').innerHTML = '<option>Seleccione una factura...</option>';
        archivos.forEach((elemento) => {
            document.getElementById('factura').innerHTML += "<option>" + elemento.replace(/\.[^/.]+$/, "") + "</option>";
        })
        document.getElementById('btnModificarFactura').disabled = "disabled";
        document.getElementById('btnEliminarFactura').disabled = "disabled";
    }

    /**
     * Muestra la información de un producto seleccionado, se la pasa el precio del producto cogido por el controlador del modelo
     * @param producto
     */
    mostrarInfoProducto(producto) {
        if (this.#desplegableProducto.selectedIndex == 0) {
            document.getElementById("precio").value = '';
            document.getElementById("importe").value = '';
            document.getElementById("unidades").value = 1;
        } else {
            document.getElementById("precio").value = producto.precio
            document.getElementById("importe").value = parseFloat(producto.precio) * parseInt(document.getElementById("unidades").value)
        }
    }

    /**
     * Borra la factura de la pantalla
     */
    borraFactura() {
        let tbody = document.getElementById("tabla").children[1];
        tbody.innerHTML = '';
    }

    /**
     * Resetea el desplegable de la factura
     */
    resetFacturaSelect() {
        this.#desplegableFactura.selectedIndex = 0;
        this.#btnModificarFactura.disabled = 'disabled';
        this.#btnEliminarFactura.disabled = 'disabled';
    }

    /**
     * Genera la tabla a partir de la cesta de la factura que viene como array de articulos en formato JSON
     * @param {JSON[]} cesta 
     * @returns Array con las referencias para añadir el boton de eliminar fila
     */
    generarTabla(cesta) {
        // Modificamos la vista de la factura
        let tbody = document.getElementById("tabla").children[1];
        tbody.innerHTML = '';

        let botonArray = [];

        // recorremos cesta para pintar cada elemento
        cesta.forEach((elemento) => {

            let producto = elemento.descripcion;
            let precio = parseFloat(elemento.precio);
            let unidades = parseInt(elemento.unidades);
            let importe = parseFloat(elemento.importe);

            let fila = "<td>" + producto + "</td><td>" + precio.toFixed(2) + "</td><td>" + unidades + "</td><td>" + importe.toFixed(2) + "</td><td style=\"width:15px\"><button class=\"rojo\" type=\"button\">X</button></td>";
            let tre = document.createElement("tr");
            tre.className = "trborrar"
            tre.innerHTML = fila;

            // Se utiliza appendChild para no perder referencias de eventos de las filas anteriores
            document.getElementById("tabla").children[1].appendChild(tre);

            botonArray.push([tre.children[4].children[0], elemento]);
        })
        return botonArray;
    }

    /**
     * Muestra el total de la factura
     * @param {float} total 
     */
    totalizar(total) {
        // Visualizamos el total en la vista
        var filatotal = "<tr><td></td><td></td><td>Total</td><td align=\"right\">" + total + "</td><td style=\"width:15px\"></td></tr>";
        document.getElementById("tfoot").innerHTML = filatotal;

        // Limpiamos para poder seleccionar otro producto
        this.#desplegableProducto.value = "Seleccione un producto..."
        document.getElementById("precio").value = ""
        document.getElementById("unidades").value = "1"
        document.getElementById("importe").value = ""
    }
}