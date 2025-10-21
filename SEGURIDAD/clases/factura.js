import Producto from './producto.js';

export default class Factura {
    #carrito
    #productos // lista de productos <--- SEPARAR
    #nombreProd
    #precio
    #desplegable

    constructor(carrito, desplegable, nombreProd, precio) {
        this.#carrito = carrito;
        this.#desplegable = desplegable;
        this.#nombreProd = nombreProd;
        this.#precio = precio;
        this.#productos = [];
    }

    getCarrito = () => this.#carrito;

    anadirProducto() {
        console.log(this.#nombreProd);

        const prodNuevo = new Producto(this.#nombreProd.value, this.#precio.value);
        if (this.#productos.find((p) => p === prodNuevo)) { // producto ya guardado
            const texto = document.createElement('p').innerHTML = "<i>El producto ya ha sido registrado</i>";
            console.log(texto);
            this.#nombreProd.appendChild(texto);

        } else { // no guardado
            // anadir en el desplegable
            const nuevo = document.createElement('option');
            console.log(this.#nombreProd.value);
            nuevo.value = this.#nombreProd.value;
            nuevo.textContent = this.#nombreProd.value;
            this.#desplegable.append(nuevo);

            // guardar en la lista de productos
            this.#productos.push(prodNuevo);
            console.log(this.#productos);

            // vaciar campos
            this.vaciarCampos();
        }
    }

    seleccionarProd() {
        Array.from(this.#desplegable).forEach((opcion) => {
            if (opcion.selected) {
                /*
                let producto;
                this.#productos.forEach((prod) => {
                    if (prod.getNombre() === opcion.value) {
                        producto = prod;
                    }
                })*/

                let producto = this.#productos.find((p) => p.getNombre() === opcion.value);
                let campos = this.#carrito.getCampos();
                campos[0].disabled = true; // precio
                campos[2].disabled = true; // importe

                console.log(producto);
                // let precio = Number(producto.getPrecio());
                campos[0].value = producto.getPrecio();

                this.cambiarImporte();
            }
        })
    }

    cambiarImporte() {
        let campos = this.#carrito.getCampos();
        campos[2].value = Number(campos[0].value) * Number(campos[1].value);
    }

    anadirLinea() {

    }

    vaciarCampos() {
        console.log(this.#nombreProd);
        console.log(this.#precio);

        this.#nombreProd.value = "";
        this.#precio.value = "";

        console.log(this.#nombreProd);
        console.log(this.#precio);
    }

    /*
    inicializacion() {
        // Para todos los enlaces que hay en la tabla enlaces Delete
        let aNodes = document.getElementById("employeetable").getElementsByTagName("a");

        Array.from(aNodes).forEach((elemento) => {
            // Función que eliminaria una fila
            elemento.onclick = function () {
                let trNode = this.parentNode.parentNode;
                let textContent = trNode.getElementsByTagName("td")[0].firstChild.nodeValue;
                textContent = textContent.trim();

                let flag = confirm("¿Estás seguro de que quieres eliminar" + textContent + "¿Información?");
                if (flag) deleteNode(trNode);
            }

        })
    }*/
}