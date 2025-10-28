export class Validar extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.nombre = "Error de validación";
    }
}

export function valCamposProducto(nombre, precio) {
    if (nombre === "") {
        throw new Validar("El nombre no puede estar vacío");
    }
    if (isNaN(precio)) {
        throw new Validar("El precio tiene que ser un número entero o decimal");
    }
}

export function existeProducto(dato) {
    if (dato === undefined) {
        throw new Validar("Ya existe el producto en la lista");
    }
}

export function desplegableProductos(dato) {
    if (dato === undefined) {
        throw new Validar("Por favor, seleccione un producto");
    }
}