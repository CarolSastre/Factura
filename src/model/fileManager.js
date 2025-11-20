// const fs = require('fs')

export class FileManager {

    init() {
        
    }
 
    eliminaArchivo(path) {
        return new Promise ( (resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) reject(new Error(err));
                else {
                    resolve('');
                    console.log(path + " was deleted");
                }
            });
        }); 
    }


    buscarArchivosStartWith(dir, prefix) {
        return new Promise ( (resolve, reject) => {

            fs.readdir(dir, (err, archivos) => {
                if (err) reject(new Error(err));
                else {
                    archivos = archivos.filter(element => element.startsWith(prefix));
                    resolve(archivos);
                }
            })
        })
    }
}
