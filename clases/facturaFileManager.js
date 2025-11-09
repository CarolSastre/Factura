const fs = require('fs');
const moment = require('moment');

export class FacturaFileManager {

    crearFactura(compra, campos) {
        const listaFilas = compra.listarFilas();

        if (listaFilas.length !== 0) {
            // conseguir fecha actual
            const fechaF = moment().format('YYYYMMDD-hhmmssa');
            const totalF = compra.getTotal();

            // crear path del archivo
            const path = "Factura_" + fechaF + ".json";

            // guardar datos factura
            const factura = {
                fecha: fechaF,
                total: totalF,
                productos: listaFilas.map((p) => ({
                    nombre: p.getProducto().getNombre(),
                    precio: Number.parseFloat(p.getProducto().getPrecio()),
                    cantidad: Number.parseInt(p.getCantidad())
                }))
            }

            let promesa = new Promise((resolve) => {
                resolve(fs.writeFile(path, JSON.stringify(factura, null, 2), (err) => {
                    if (err) console.error("Error escribiendo el archivo: " + err.message);
                }));
            })

            promesa.then(() => {
                campos.actualizarDesplegableFacturas();
                compra.borrarCesta();
                console.log("Factura creada");
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    cargarFactura(path, compra) {
        compra.borrarCesta();

        let promesa = new Promise((resolve) => {
            resolve(fs.readFile(path, (err, buffer) => {
                if (err) console.error("Error leyendo el archivo: " + err.message);

                const factura = JSON.parse(buffer.toString());

                const filas = factura.productos;
                Array.from(filas).forEach((f) => {
                    // crear nueva fila
                    let nuevaFila = document.createElement('tr');

                    // añadir producto
                    const celdaProd = document.createElement('td');
                    celdaProd.textContent = f.nombre;
                    nuevaFila.append(celdaProd);
                    // añadir precio
                    const celdaPre = document.createElement('td');
                    celdaPre.textContent = f.precio + " €";
                    celdaPre.setAttribute('align', 'right');
                    nuevaFila.append(celdaPre);
                    // añadir cantidad
                    const celdaCan = document.createElement('td');
                    celdaCan.textContent = f.cantidad;
                    celdaCan.setAttribute('align', 'right');
                    nuevaFila.append(celdaCan);

                    // añadir importe
                    const celdaImp = document.createElement('td');
                    celdaImp.textContent = Number.parseFloat(f.cantidad * f.precio).toFixed(2) + " €";
                    celdaImp.setAttribute('align', 'right');
                    nuevaFila.append(celdaImp);

                    // crear y añadir botón de borrar
                    const celdaB = document.createElement('td');
                    const boton = document.createElement('button');
                    boton.textContent = "X";
                    boton.setAttribute('class', 'rojo');
                    boton.setAttribute('type', 'button');

                    boton.onclick = (e) => {
                        let fila = e.srcElement.parentNode.parentNode;

                        fila.parentNode.removeChild(fila);

                        compra.actualizarTotal();
                    }

                    celdaB.append(boton);
                    nuevaFila.append(celdaB);

                    // añadir la fila a la tabla
                    compra.getTabla().append(nuevaFila);
                });
            })
            )
        })

        promesa.then(() => {
            // añadir el total de la factura
            compra.actualizarTotal();
            console.log("Factura cargada");
        }).catch((err) => {
            console.log(err);
        });
    }

    modificarFactura(nombre, compra, campos) {
        const listaFilas = compra.listarFilas();
        const totalF = compra.getTotal();

        // separa el nombre del archivo de la extensión .json y de "Factura_"
        const fechaF = nombre.split(".")[0].split("_")[1];

        // guardar datos factura
        const factura = {
            fecha: fechaF,
            total: totalF,
            productos: listaFilas.map((p) => ({
                nombre: p.getProducto().getNombre(),
                precio: Number.parseFloat(p.getProducto().getPrecio()),
                cantidad: Number.parseInt(p.getCantidad())
            }))
        }

        let promesa = new Promise((resolve) => {
            resolve(
                fs.writeFile(nombre, JSON.stringify(factura, null, 2), (err) => {
                    if (err) console.error("Error reescribiendo el archivo: " + err.message);
                })
            )
        })

        promesa.then(() => {
            campos.actualizarDesplegableFacturas();
            compra.borrarCesta();
            console.log("Factura modificada");
        }).catch((err) => {
            console.log(err);
        });
    }

    eliminarFactura(path, compra, campos) {
        let promesa = new Promise((resolve) => {
            resolve(
                fs.rm(path, (err) => {
                    if (err) console.error("Error eliminando el archivo: " + err.message);
                })
            )
        })

        promesa.then(() => {
            campos.actualizarDesplegableFacturas();
            compra.borrarCesta();
            console.log("Factura eliminada");
        }).catch((err) => {
            console.log(err);
        });
    }
}