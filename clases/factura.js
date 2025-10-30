const fs = require('fs');

export class Factura {
    // div alta
    #camposProducto

    #lista_productos
    #carrito
    #formulario

    #prodFile
    #facFile
    #desplegableFac

    constructor(nombreProd, precioProd, lista, carrito, formulario, prodFile, facFile, desplegableFac) {
        this.#camposProducto = [nombreProd, precioProd];
        this.#lista_productos = lista;
        this.#carrito = carrito;
        this.#formulario = formulario;
        this.#prodFile = prodFile;
        this.#facFile = facFile;
        this.#desplegableFac = desplegableFac;

    }

    limpiarCampos() {
        this.#camposProducto[0].value = "";
        this.#camposProducto[1].value = "";
    }

    anadirProducto() {
        const nombre = this.#camposProducto[0].value;
        const precio = Number.parseFloat(this.#camposProducto[1].value);

        if (this.#lista_productos.buscarProducto(nombre) !== undefined) { // ya existe 
            alert('El producto ya existe en la lista.');
        } else { // no existe
            // guarda el producto en la lista
            this.#lista_productos.guardarProducto(new Producto(nombre, precio));

            // añade el producto en el desplegable
            this.#formulario.cargarProductos(this.#lista_productos);

            this.limpiarCampos();

            // guardar la lista de productos
            this.#prodFile.guardarArchivoProductos();
        }
    }

    crearFactura() {
        const factura = this.#facFile.crearFactura(this.#carrito);
        console.log(factura);

        // actualizar desplegable facturas
    }
    
    
    actualizarDesplegableFacturas(){
        let arrayFacs = [];
        
        fs.glob('Factura_*.json', (err, matches) => {
            if (err) console.error("Error buscar los archivos: " + err.message);
            console.log(matches);
            arrayFacs = matches;
        });

        const opcion = document.createElement('option');
        opcion.setAttribute('selected', );

        // TODO: mostrar cada nombre de factura en el desplegable
    }
}