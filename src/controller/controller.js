// const fs = require('fs')

import { Stock } from '../model/stock.js';
import { Factura } from '../model/factura.js';
import { FileManager } from '../model/fileManager.js';

import { View } from '../view/view.js';

export class Controller {

    // Access to view and model
    #stock;
    #factura;
    #fileManager
    #view;

    // ruta donde se guardan las facturas
    #ruta = './facturas';

    // Instantiating classes
    constructor() {
        this.#stock = new Stock();
        this.#factura = new Factura();
        this.#view = new View();
        this.#fileManager = new FileManager()
    }

    // Initializing classes
    init() {

        this.#stock.init()
            .then((value) => {
                this.buscarProductos();
            });

        this.#factura.init();
        this.#fileManager.init();

        this.#view.init();

        if (!fs.existsSync(this.#ruta)) {
            fs.mkdirSync(this.#ruta);
        }
        this.buscarFacturas();
    }

    getRuta() { return this.#ruta }


    // Busca productos en fichero productos.json y  desplegable de produtos
    buscarProductos() {
        this.#stock.buscarProductos()
            .then((value) => {
                this.#view.cargarProductos(value);
            })
            .catch((error) => { console.log(error); })
    }




    // Busca Facturas en directorio actual y carga desplegable de facturas
    buscarFacturas() {
        this.#fileManager.buscarArchivosStartWith(this.#ruta, 'Factura_')
            .then((value) => {
                this.#view.cargarFacturas(value);
            })
            .catch((error) => { console.log(error); })
    }




    // Muestra y oculta la ventana de alta de productos llamando al metodo con el mismo nombre de la vista
    promptWindow() {
        this.#view.promptWindow();
    }




    // Carga la información del producto seleccionado del desplegable de productos
    // En el caso que no se seleccione ninguno se resetean los campos
    cargarInfoProducto() {
        let producto = this.#stock.getProductByDescripcion(this.#view.getSelectedProducto());
        if (producto != null) this.#view.mostrarInfoProducto(producto.toJSON());
        else this.#view.mostrarInfoProducto();
    }




    // Calcula el importe total de la factura
    totalizar() {

        // calculamos el total en el modelo objeto factura
        this.#factura.totalizar()

        // pintamos el total en la vista
        this.#view.totalizar(this.#factura.getImporteTotal().toFixed(2));
    }


    // Borra la factura cargada pudiendo resetear el desplegable de facturas si le pasamos true
    borraFactura(resetFacturaSelect = false) {
        this.#view.borraFactura();
        if (resetFacturaSelect) this.#view.resetFacturaSelect();

        this.#factura.vaciarArticulos();

        this.totalizar();
    }


    // Carga la factura seleccionada del desplegable de facturas
    cargarFactura() {

        this.borraFactura(false);

        if (this.#view.getSelectedFactura() != '') {

            let fichero = this.#ruta + '/' + this.#view.getSelectedFactura() + ".json";

            // electronAPI.readFile(fichero)
            this.#factura.leerFactura(fichero)
                .then((value) => {
                    this.#view.generarTabla(value).forEach((elemento) => {
                        elemento[0].addEventListener('click', () => {
                            // eliminamos la fila que contiene la x donde se ha hecho click
                            elemento[0].closest('tr').remove();
                            this.#factura.eliminarArticulo(elemento[1]);
                            // Este totalizar se ejecuta al hacer click y eliminar una fila de la factura
                            this.totalizar();
                        })
                    })
                    // Este totalizar se ejecuta una vez cargada la factura
                    this.totalizar();
                })
                .catch((error) => console.log(error))
        }
    }




    // Almacena la factura que tenemos en pantalla. Puede guardarse en una nueva (acion = 0) o en la misma que estamos viendo (accion = 1)
    // Es obligatorio que reciba 0 o 1
    guardaFactura(accion) {
        let name = '';
        if (accion == 1) name = this.#view.getSelectedFactura() + ".json";
        if ((accion == 0) || ((name != '') && (accion == 1))) {
            this.#factura.guardarFactura(accion, this.#ruta, name)
                .then((value) => {
                    this.buscarFacturas();
                })
            this.borraFactura(true);
        }
    }




    // Elimina la factura que tenemos en pantalla
    eliminaFactura() {
        this.#fileManager.eliminaArchivo(this.#ruta + "/" + this.#view.getSelectedFactura() + ".json")
            .then(() => {
                this.buscarFacturas();
            });
        this.borraFactura(true);
    }




    // Da de alta un nuevo producto
    altaProducto() {

        // Recibimos un json con la informacion del producto descripcion y precio obtenido a partir de la vista
        let datosAlta = this.#view.getDatosAlta();

        // Devuelve todo el stock de productos como array de objetos JSON
        this.#stock.altaProductoInStock(datosAlta.descripcion, datosAlta.precio)
            .then((value) => {
                this.#view.cargarProductos(value);

                // Quita un posible mensaje de error anterior
                this.#view.muestraErrorProducto('');
            })
            .catch((error) => {
                this.#view.muestraErrorProducto(error);
            });

        // Vacia campos del formulario de alta
        this.#view.resetAltaProducto();
    }




    anyadirFilaFactura() {

        // Recibimos un json con los datos para poder crear un articulo
        let datosArticulo = this.#view.getDatosArticulo();

        // Creamos o modificamos el articulo en la cesta de la compra
        this.#factura.anadirArticulo(datosArticulo.descripcion, datosArticulo.precio, datosArticulo.unidades);

        this.#view.generarTabla(this.#factura.getCestaJSON()).forEach((elemento) => {
            elemento[0].addEventListener('click', () => {
                // eliminamos la fila que contiene la x donde se ha hecho click
                elemento[0].closest('tr').remove();
                this.#factura.eliminarArticulo(elemento[1]);
                // Este totalizar se ejecuta al hacer click y eliminar una fila de la factua
                this.totalizar();
            });
        });

        this.totalizar();
    }
}