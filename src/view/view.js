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

    // Obtenemos un objeto JSON con los datos que figuran para ser introducidos en una fila
    getDatosArticulo() {
        return {
            descripcion : this.getSelectedProducto(),
            precio : document.getElementById('precio').value,
            unidades : document.getElementById('unidades').value,
        }
    }

    // Obtenemos la descripcion del articulo seleccionado
    getSelectedProducto() {
        return this.#desplegableProducto.options[this.#desplegableProducto.selectedIndex].textContent;
    }

    // Obtenemos el nombre de la fatura seleccionada o '' si no hay ninguna ademas de activar o no botones
    getSelectedFactura() {
        if (this.#desplegableFactura.selectedIndex == 0) {
            this.#btnModificarFactura.disabled='disabled';
            this.#btnEliminarFactura.disabled='disabled';
            return '';
        }
        else {
            this.#btnModificarFactura.removeAttribute('disabled');
            this.#btnEliminarFactura.removeAttribute('disabled');
            return this.#desplegableFactura.options[this.#desplegableFactura.selectedIndex].textContent;
        }
    }

    // obtenemos un objeto con los datos introducidos en el alta de producto
    getDatosAlta() {
        return { descripcion : document.getElementById('productoName').value, precio : document.getElementById('productoPrecio').value};
    }

    // función que muestra un mensaje en la ventana de alta de producto
    muestraErrorProducto(error) {
        document.getElementById("error").textContent = error;
    }

    // Vaciamos las cajas de nombre y precio del producto en el alta
    resetAltaProducto() {
         document.getElementById("productoName").value = ""
         document.getElementById("productoPrecio").value = ""
    }

    // muestra u oculta la ventana de alta de producto
    promptWindow() {
        let e = document.getElementById("alta"); 
        if (e.style.display == "block") { 
            e.style.display = "none" 
        } else { //si no
            e.style.display = "block"; 
        }
    }

    // Carga el desplegable de productos a partir de un array de productos en formato JSON
    cargarProductos(productos) {
        this.#desplegableProducto.innerHTML = '<option>Seleccione un producto...</option>' 
        productos.forEach( (elemento, index) => {
            let option = document.createElement("option");
            option.textContent = elemento.descripcion; 
            this.#desplegableProducto.add(option);                
        })
    }

    // A partir de un array de archivos carga el desplegable
    cargarFacturas(archivos) {
        document.getElementById('factura').innerHTML = '<option>Seleccione una factura...</option>';
        archivos.forEach( (elemento) => {
            document.getElementById('factura').innerHTML += "<option>" + elemento.replace(/\.[^/.]+$/, "") + "</option>";
        })
        document.getElementById('btnModificarFactura').disabled = "disabled";
        document.getElementById('btnEliminarFactura').disabled = "disabled";
    }

    // Muestra la información de un producto seleccionado, se la pasa el precio del producto cogido por el controlador del modelo
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

    // Borra la factura de la pantalla
    borraFactura() {
        let tbody = document.getElementById("tabla").children[1];
        tbody.innerHTML = '';
    }

    // Resetea el desplegable de la factura
    resetFacturaSelect() {
        this.#desplegableFactura.selectedIndex = 0;
        this.#btnModificarFactura.disabled='disabled';
        this.#btnEliminarFactura.disabled='disabled';
    }

    // Genera la tabla a partir de la cesta de la factura que viene como array de articulos en formato JSON
    generarTabla (cesta) {

        // Modificamos la vista de la factura
        let tbody = document.getElementById("tabla").children[1];
        tbody.innerHTML = '';

        let botonArray = [];

        // recorremos cesta para pintar cada elemento
        cesta.forEach( (elemento) => {

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


    // Muestra el total de la factura
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