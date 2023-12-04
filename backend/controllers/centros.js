const { dbConnection } = require('../database/configdb');
const connection = dbConnection();

const getCentros = (req, res) => {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM centro_escolar', (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener los centros"});
            }else{
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getCentros',
                        results
                    })
                );
            }
        });
    });
}

const createCentro = (req, res) => {
    return new Promise(function(resolve, reject) {
        connection.query('INSERT INTO centro_escolar SET ?', [req.body], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al crear el centro"});
            }else{
                resolve(
                    res.json({
                        ok: true,
                        msg: 'createCentro'
                    })
                );
            }
        });
    });
}

const updateCentro = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Centro;
        connection.query('SELECT * FROM centro_escolar WHERE ID_Centro = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al actualizar el centro"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Centro no encontrado" });
                }else{
                    connection.query('UPDATE centro_escolar SET ? WHERE ID_Centro = ?', [req.body, id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'updateCentro'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

const deleteCentro = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Centro;
        connection.query('SELECT * FROM centro_escolar WHERE ID_Centro = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al eliminar el centro"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Centro no encontrado" });
                }else{
                    connection.query('DELETE FROM centro_escolar WHERE ID_Centro = ?', [id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'deleteCentro'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

module.exports = { getCentros, createCentro, updateCentro, deleteCentro };