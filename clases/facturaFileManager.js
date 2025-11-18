const fs = require('fs');

export class FacturaFileManager {

    escribirFactura(path, fechaF, totalF, listaFilas) {
        const factura = {
            fecha: fechaF,
            total: totalF,
            productos: listaFilas.map((p) => ({
                nombre: p.getProducto().getNombre(),
                precio: Number.parseFloat(p.getProducto().getPrecio()),
                cantidad: Number.parseInt(p.getCantidad())
            }))
        }

        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(factura, null, 2), (err) => {
                if (err) reject(new Error("Error escribiendo el archivo " + path));
                resolve(path);
            });
        });
    }

    cargarFactura(path, compra) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, buffer) => {
                if (err) reject(new Error("Error leyendo el archivo " + path));

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

                resolve(path);
            })
        })
    }

    eliminarFactura(path) {
        return new Promise((resolve, reject) => {
            fs.rm(path, (err) => {
                if (err) reject(new Error("Error eliminando el archivo " + path));
                resolve(path);
            })
        });
    }
}