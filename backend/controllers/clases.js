const { dbConnection } = require('../database/configdb');
const connection = dbConnection();

const getClases = (req, res) => {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM clase', (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener las clases"});
            }else{
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getClases',
                        results
                    })
                );
            }
        });
    });
}

const createClase = (req, res) => {
    return new Promise(function(resolve, reject) {
        connection.query('INSERT INTO clase SET ?', [req.body], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al crear la clase"});
            }else{
                resolve(
                    res.json({
                        ok: true,
                        msg: 'createClase'
                    })
                );
            }
        });
    });
}

const updateClase = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Clase;
        connection.query('SELECT * FROM clase WHERE ID_Clase = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al actualizar la clase"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Clase no encontrada" });
                }else{
                    connection.query('UPDATE clase SET ? WHERE ID_Clase = ?', [req.body, id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'updateClase'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

const deleteClase = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Clase;
        connection.query('SELECT * FROM clase WHERE ID_Clase = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al eliminar la clase"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Clase no encontrada" });
                }else{
                    connection.query('DELETE FROM clase WHERE ID_Clase = ?', [id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'deleteClase'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

module.exports = { getClases, createClase, updateClase, deleteClase };